"use client";

import { redirect, useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { useEffect } from "react";
import remarkGfm from "remark-gfm";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import LessonButtons from "./components/lessonbuttons";
import Link from "next/link";
import Markdown from "react-markdown";
import Quiz from "@/app/lesson/components/interactive/quiz";
import LessonHeading from "@/app/lesson/components/lessonheading";
import { useSectionContext } from "@/app/lesson/sectioncontext";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string; chapter: string; lesson: string };
  searchParams: { l: string };
}) {
  if (!searchParams.l) {
    redirect(`?l=1`);
  }
  const lessonNumber = parseInt(searchParams.l ?? "1");

  const router = useRouter();
  const sectionQuery = trpc.course.getCourseSection.useQuery({
    sectionId: parseInt(
      params.lesson && typeof params.lesson === "string" ? params.lesson : "1",
    ),
  });

  const { section, setSection } = useSectionContext();

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

  const mutateBlock = trpc.course.setBlockCompleted.useMutation();

  const handleContinue = ({ blockId }: { blockId: number }) => {
    mutateBlock.mutate({
      blockId,
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
          <div className="prose prose-slate relative px-8 py-2 dark:prose-invert">
            <div>
              {section[lessonNumber - 1]?.blocks
                .sort((a, b) => a.order - b.order)
                .map((block, index) => {
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
                    block.interactiveComponents.length > 0 ? (
                      block.interactiveComponents.map((component) => {
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
                              subSection={lessonNumber}
                              params={params}
                              blockId={block.id}
                              completed={block.userCompletedBlocks.length > 0}
                              key={component.quizzes?.id ?? 1}
                              content={question}
                              explanation={explanation}
                              options={[
                                component.quizzes?.optionOne ?? "",
                                component.quizzes?.optionTwo ?? "",
                                component.quizzes?.optionThree ?? "",
                                component.quizzes?.optionFour ?? "",
                              ]}
                              answer={component.quizzes?.correctOption ?? "ONE"}
                            />
                          );
                        }
                      })
                    ) : block.order <
                        (section[lessonNumber - 1]?.blocks.length ?? 0) &&
                      block.userCompletedBlocks.length === 0 ? (
                      <Button
                        onClick={() => handleContinue({ blockId: block.id })}
                      >
                        Continue
                      </Button>
                    ) : null;

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
                      className={`${block.order > 1 ? "pt-16" : ""} ${
                        blockVisible ? "" : "hidden"
                      }`}
                    >
                      <div>{markdown}</div>
                      {interactive}
                      {section[lessonNumber - 1]?.blocks.length ===
                        block.order && (
                        <>
                          {section.length > lessonNumber ? (
                            <Link href={`?l=${lessonNumber + 1}`}>
                              <LessonButtons
                                params={params}
                                section={section}
                                subSection={lessonNumber}
                              />
                            </Link>
                          ) : (
                            <a
                              href={`/courses/${params.slug}?chapter=${params.chapter}`}
                            >
                              <LessonButtons
                                params={params}
                                section={section}
                                subSection={lessonNumber}
                              />
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
