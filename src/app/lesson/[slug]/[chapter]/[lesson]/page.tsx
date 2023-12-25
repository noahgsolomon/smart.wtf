"use client";

import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";
import remarkGfm from "remark-gfm";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import LessonButtons from "./components/lessonbuttons";
import Markdown from "react-markdown";
import Quiz from "@/app/lesson/components/interactive/quiz";
import LessonHeading from "@/app/lesson/components/lessonheading";
import { useSectionContext } from "@/app/lesson/sectioncontext";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Understanding from "@/app/lesson/components/interactive/understanding";
import useSound from "use-sound";
import Sort from "@/app/lesson/components/interactive/sort/sort";
import { useChatContext } from "@/app/context/chat/ChatContext";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string; chapter: string; lesson: string };
  searchParams: { l: string; b: string };
}) {
  const router = useRouter();

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 30;

    const navigateAndScroll = () => {
      if (searchParams.b && searchParams.l) {
        const element = document.getElementById(searchParams.b);
        if (element) {
          element.scrollIntoView();
        } else if (attempts < maxAttempts) {
          setTimeout(navigateAndScroll, 100);
          attempts++;
        }
      }
    };

    if (!searchParams.l) {
      router.push(`?l=1`);
    } else {
      navigateAndScroll();
    }
  }, [searchParams, router]);

  const lessonNumber = parseInt(searchParams.l ?? "1");

  const sectionQuery = trpc.course.getCourseSection.useQuery({
    sectionId: parseInt(
      params.lesson && typeof params.lesson === "string" ? params.lesson : "1",
    ),
  });

  const { section, setSection } = useSectionContext();

  const [play] = useSound("/click.mp3", { volume: 0.5 });

  useEffect(() => {
    if (!sectionQuery.isLoading) {
      const sortedSections = [...(sectionQuery.data?.section ?? [])].sort(
        (a, b) => a.order - b.order,
      );
      setSection(sortedSections);
      console.log("loaded");
    } else {
      console.log("loading");
    }
  }, [setSection, sectionQuery.isLoading, sectionQuery.data?.section]);

  const mutateBlock = trpc.course.setBlockCompleted.useMutation({
    onSuccess: (response) => {
      console.log("successss");
      console.log(JSON.stringify(response.data, null, 2));
      if (response.data.firstCommitToday) {
        toast(`You're on a ${response.data.streakCount} day streak`, {
          icon: "🔥",
        });
      }
    },
  });

  const { setLesson, lesson } = useChatContext();

  console.log(lesson);

  let chatContext = "";

  const handleContinue = ({
    blockId,
    blockOrder,
    sectionId,
  }: {
    blockId: number;
    blockOrder: number;
    sectionId: number;
  }) => {
    play();
    mutateBlock.mutate({
      blockId,
      courseId: section[0]?.courseChapterSections.course.id!,
      blockOrder,
      sectionId,
      subSectionId: section[lessonNumber - 1]?.id!,
      subSectionOrder: lessonNumber,
      chapterId: section[0]?.courseChapterSections.courseChapters.id!,
      chapterOrder: section[0]?.courseChapterSections.courseChapters.order!,
      sectionOrder: section[0]?.courseChapterSections.order!,
      slug: params.slug,
    });

    setSection((prev) => {
      return prev.map((section, index) => {
        if (index === lessonNumber - 1) {
          const updatedBlocks = section.blocks.map((block) => {
            if (block.id === blockId) {
              const updatedUserCompletedBlocks = [
                ...block.userCompletedBlocks,
                { blockId: blockId },
              ];
              return {
                ...block,
                userCompletedBlocks: updatedUserCompletedBlocks,
              };
            }
            return block;
          });
          return { ...section, blocks: updatedBlocks };
        }
        return section;
      });
    });

    const currentBlock = section[lessonNumber - 1]?.blocks.find(
      (b) => b.id === blockId,
    );

    const nextBlock = section[lessonNumber - 1]?.blocks.find(
      (b) => b.order === currentBlock?.order! + 1,
    );

    const currentBlockOrder = currentBlock?.order!;

    const isNotLastBlockInSubsection =
      currentBlockOrder < (section[lessonNumber - 1]?.blocks.length ?? 0);

    if (isNotLastBlockInSubsection && nextBlock) {
      setTimeout(() => {
        document.getElementById(nextBlock.id.toString())!.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <>
      <LessonHeading section={section} />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.15, delay: 0.3 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.15 },
          }}
          key={lessonNumber}
          className="flex justify-center px-0 pb-4 pt-28 md:px-4"
        >
          <div className="prose prose-slate relative px-8 py-2 pb-24 dark:prose-invert">
            <div>
              {section[lessonNumber - 1]?.blocks
                .sort((a, b) => a.order - b.order)
                .map((block, index) => {
                  chatContext += "\n\n" + block.markdown;
                  if (index === section[lessonNumber - 1]?.blocks.length! - 1) {
                    setLesson(chatContext);
                  }
                  const markdown = (
                    <Markdown
                      components={{
                        img: ({ ...props }) => (
                          <Image
                            className="rounded-lg"
                            src={
                              props.src ??
                              "https://images.codefoli.com/smartwtf.png"
                            }
                            alt={props.alt ?? "smartwtf"}
                            priority={true}
                            layout="responsive"
                            width={1792}
                            height={1024}
                          />
                        ),
                      }}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[
                        slug,
                        [
                          rehypeAutolinkHeadings,
                          {
                            behavior: "wrap",
                          },
                        ],
                        rehypeHighlight,
                      ]}
                    >
                      {block.markdown}
                    </Markdown>
                  );
                  const interactive =
                    block.interactiveComponents.length > 0
                      ? block.interactiveComponents.map((component) => {
                          if (component.type === "QUIZ") {
                            const explanation = (
                              <Markdown
                                components={{
                                  img: ({ ...props }) => (
                                    <Image
                                      src={
                                        props.src ??
                                        "https://images.codefoli.com/smartwtf.png"
                                      }
                                      alt={props.alt ?? "smartwtf"}
                                      layout="responsive"
                                    />
                                  ),
                                }}
                              >
                                {component.quizzes?.explanationMarkdown ??
                                  "## no explanation right now, sorry :("}
                              </Markdown>
                            );
                            const question = (
                              <Markdown
                                components={{
                                  img: ({ ...props }) => (
                                    <Image
                                      src={
                                        props.src ??
                                        "https://images.codefoli.com/smartwtf.png"
                                      }
                                      alt={props.alt ?? "smartwtf"}
                                      layout="responsive"
                                    />
                                  ),
                                }}
                              >
                                {component.quizzes?.questionMarkdown ??
                                  "## no question right now, sorry :("}
                              </Markdown>
                            );
                            return (
                              <Quiz
                                chapterId={
                                  section[0]?.courseChapterSections
                                    .courseChapters.id!
                                }
                                chapterOrder={
                                  section[0]?.courseChapterSections
                                    .courseChapters.order!
                                }
                                sectionOrder={
                                  section[0]?.courseChapterSections.order!
                                }
                                sectionId={
                                  section[lessonNumber - 1]
                                    ?.courseChapterSections.id!
                                }
                                subSection={lessonNumber}
                                params={params}
                                blockOrder={block.order}
                                blockId={block.id}
                                completed={block.userCompletedBlocks.length > 0}
                                key={component.quizzes?.id ?? 1}
                                content={question}
                                explanation={explanation}
                                options={component.quizzes?.options ?? []}
                                answer={component.quizzes?.correctOption ?? 1}
                              />
                            );
                          }
                          if (component.type === "UNDERSTANDING") {
                            const explanation = (
                              <Markdown
                                components={{
                                  img: ({ ...props }) => (
                                    <Image
                                      src={
                                        props.src ??
                                        "https://images.codefoli.com/smartwtf.png"
                                      }
                                      alt={props.alt ?? "smartwtf"}
                                      layout="responsive"
                                    />
                                  ),
                                }}
                              >
                                {component.understanding?.explanationMarkdown ??
                                  "## no explanation right now, sorry :("}
                              </Markdown>
                            );
                            const question = (
                              <Markdown
                                components={{
                                  img: ({ ...props }) => (
                                    <Image
                                      src={
                                        props.src ??
                                        "https://images.codefoli.com/smartwtf.png"
                                      }
                                      alt={props.alt ?? "smartwtf"}
                                      layout="responsive"
                                    />
                                  ),
                                }}
                              >
                                {component.understanding?.questionMarkdown ??
                                  "## no question right now, sorry :("}
                              </Markdown>
                            );
                            return (
                              <Understanding
                                params={params}
                                chapterId={
                                  section[0]?.courseChapterSections
                                    .courseChapters.id!
                                }
                                chapterOrder={
                                  section[0]?.courseChapterSections
                                    .courseChapters.order!
                                }
                                sectionOrder={
                                  section[0]?.courseChapterSections.order!
                                }
                                sectionId={
                                  section[lessonNumber - 1]
                                    ?.courseChapterSections.id!
                                }
                                key={component.understanding?.id ?? 1}
                                subSection={lessonNumber}
                                blockId={block.id}
                                blockOrder={block.order}
                                questionString={
                                  component.understanding?.questionMarkdown ??
                                  "## no question right now, sorry :("
                                }
                                explanationString={
                                  component.understanding
                                    ?.explanationMarkdown ??
                                  "## no explanation right now, sorry :("
                                }
                                completed={block.userCompletedBlocks.length > 0}
                                question={question}
                                explanation={explanation}
                              />
                            );
                          }
                          if (component.type === "SORTING") {
                            const explanation = (
                              <Markdown
                                components={{
                                  img: ({ ...props }) => (
                                    <Image
                                      src={
                                        props.src ??
                                        "https://images.codefoli.com/smartwtf.png"
                                      }
                                      alt={props.alt ?? "smartwtf"}
                                      layout="responsive"
                                    />
                                  ),
                                }}
                              >
                                {component.sorting?.explanationMarkdown ??
                                  "## no explanation right now, sorry :("}
                              </Markdown>
                            );
                            const question = (
                              <Markdown
                                components={{
                                  img: ({ ...props }) => (
                                    <Image
                                      src={
                                        props.src ??
                                        "https://images.codefoli.com/smartwtf.png"
                                      }
                                      alt={props.alt ?? "smartwtf"}
                                      layout="responsive"
                                    />
                                  ),
                                }}
                              >
                                {component.sorting?.questionMarkdown ??
                                  "## no question right now, sorry :("}
                              </Markdown>
                            );

                            return (
                              <Sort
                                options={component.sorting?.options ?? []}
                                params={params}
                                chapterId={
                                  section[0]?.courseChapterSections
                                    .courseChapters.id!
                                }
                                chapterOrder={
                                  section[0]?.courseChapterSections
                                    .courseChapters.order!
                                }
                                sectionOrder={
                                  section[0]?.courseChapterSections.order!
                                }
                                sectionId={
                                  section[lessonNumber - 1]
                                    ?.courseChapterSections.id!
                                }
                                key={component.understanding?.id ?? 1}
                                subSection={lessonNumber}
                                blockId={block.id}
                                blockOrder={block.order}
                                questionString={
                                  component.understanding?.questionMarkdown ??
                                  "## no question right now, sorry :("
                                }
                                explanationString={
                                  component.understanding
                                    ?.explanationMarkdown ??
                                  "## no explanation right now, sorry :("
                                }
                                completed={block.userCompletedBlocks.length > 0}
                                question={question}
                                explanation={explanation}
                              />
                            );
                          }
                        })
                      : null;

                  const blockVisible =
                    index - 1 < 0
                      ? true
                      : section[lessonNumber - 1]?.blocks[index - 1] &&
                        (section[lessonNumber - 1]?.blocks[index - 1]
                          ?.userCompletedBlocks.length ?? 0) > 0;

                  return (
                    <div
                      id={block.id.toString()}
                      key={index}
                      className={`${block.order > 1 ? "pt-4" : ""} ${
                        blockVisible ? "" : "hidden"
                      }`}
                    >
                      <div className="flex flex-col pb-4">
                        {markdown}

                        {/* <div className="flex justify-end">
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Button variant={"ghost"}>
                                  <Bot className="h-4 w-4 opacity-50" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Let Professor Quantum explain this block
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div> */}
                      </div>
                      {interactive}
                      {section[lessonNumber - 1]?.blocks.length ===
                        block.order &&
                      (block.interactiveComponents?.length === 0 ||
                        block.userCompletedBlocks.length > 0) ? (
                        <>
                          {section.length > lessonNumber ? (
                            <LessonButtons
                              redirect={`?l=${lessonNumber + 1}`}
                              chapterId={
                                section[0]?.courseChapterSections.courseChapters
                                  .id!
                              }
                              chapterOrder={
                                section[0]?.courseChapterSections.courseChapters
                                  .order!
                              }
                              sectionOrder={
                                section[0]?.courseChapterSections.order!
                              }
                              blockOrder={block.order}
                              blockId={block.id}
                              params={params}
                              section={section}
                              subSection={lessonNumber}
                            />
                          ) : (
                            <LessonButtons
                              redirect={`/lesson/${params.slug}/${params.chapter}/${params.lesson}/completed`}
                              chapterId={
                                section[0]?.courseChapterSections.courseChapters
                                  .id!
                              }
                              chapterOrder={
                                section[0]?.courseChapterSections.courseChapters
                                  .order!
                              }
                              sectionOrder={
                                section[0]?.courseChapterSections.order!
                              }
                              blockOrder={block.order}
                              blockId={block.id}
                              params={params}
                              section={section}
                              subSection={lessonNumber}
                            />
                          )}
                        </>
                      ) : block.order <
                          (section[lessonNumber - 1]?.blocks.length ?? 0) &&
                        block.userCompletedBlocks.length === 0 &&
                        block.interactiveComponents.length === 0 ? (
                        <Button
                          onClick={() =>
                            handleContinue({
                              blockId: block.id,
                              blockOrder: block.order,
                              sectionId:
                                section[lessonNumber - 1]?.courseChapterSections
                                  .id!,
                            })
                          }
                        >
                          Continue
                        </Button>
                      ) : null}
                    </div>
                  );
                })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Toaster richColors position="top-center" />
    </>
  );
}
