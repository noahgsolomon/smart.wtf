"use client";

import { redirect } from "next/navigation";
import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import LessonButtons from "./components/lessonbuttons";
import Link from "next/link";
import Markdown from "react-markdown";
import Quiz from "@/app/lesson/components/interactive/quiz";
import { type Section } from "@/types";
import LessonHeading from "@/app/lesson/components/lessonheading";

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

  const sectionQuery = trpc.course.getCourseSection.useQuery({
    sectionId: parseInt(
      params.lesson && typeof params.lesson === "string" ? params.lesson : "1",
    ),
  });

  const [section, setSection] = useState<Section[]>([]);

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
  }, [sectionQuery.isLoading, sectionQuery.data?.section]);

  return (
    <>
      <LessonHeading section={section} />
      <div className="flex justify-center px-0 pb-4 pt-28 md:px-4">
        <div className="prose prose-slate relative px-8 py-2 dark:prose-invert">
          {/* <CopyButton /> */}
          <div>
            {section[lessonNumber - 1]?.blocks
              .sort((a, b) => a.order - b.order)
              .map((block, index) => {
                const markdown = (
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[
                      slug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "wrap",
                        },
                      ],
                    ]}
                  >
                    {block.markdown}
                  </Markdown>
                );
                const quiz = block.interactiveComponents.map((component) => {
                  if (component.type === "QUIZ") {
                    const explanation = (
                      <Markdown>
                        {component.quizzes?.explanationMarkdown ??
                          "## no explanation right now, sorry :("}
                      </Markdown>
                    );
                    const question = (
                      <Markdown>
                        {component.quizzes?.questionMarkdown ??
                          "## no question right now, sorry :("}
                      </Markdown>
                    );
                    return (
                      <Quiz
                        subSection={lessonNumber}
                        setSection={setSection}
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
                  } else {
                    return <></>;
                  }
                });

                const blockVisible =
                  index - 1 < 0
                    ? true
                    : section[lessonNumber - 1]?.blocks[index - 1] &&
                      (section[lessonNumber - 1]?.blocks[index - 1]
                        ?.userCompletedBlocks.length ?? 0) > 0;

                return (
                  <div
                    key={index}
                    className={`${blockVisible ? "" : "hidden"}`}
                  >
                    <div id={block.id.toString() ?? 0}>{markdown}</div>
                    {quiz}
                    {section[lessonNumber - 1]?.blocks.length ===
                      block.order && (
                      <>
                        {section.length > lessonNumber ? (
                          <Link href={`?l=${lessonNumber + 1}`}>
                            <LessonButtons
                              setSection={setSection}
                              params={params}
                              section={section}
                              subSection={lessonNumber}
                            />
                          </Link>
                        ) : (
                          <a
                            href={`/courses/${params.slug}/chapter-${params.chapter}`}
                          >
                            <LessonButtons
                              setSection={setSection}
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
      </div>
    </>
  );
}
