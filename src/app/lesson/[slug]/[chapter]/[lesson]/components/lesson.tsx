"use client";

import { useParams, useSearchParams } from "next/navigation";
import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import LessonButtons from "./lessonbuttons";
import Link from "next/link";
import Markdown from "react-markdown";
import Quiz from "@/app/lesson/components/interactive/quiz";

type Section = {
  id: number;
  name: string;
  order: number;
  sectionId: number;
  time: number;
  blocks: {
    id: number;
    subSectionId: number;
    order: number;
    markdown: string;
    interactiveComponents: {
      type: "QUIZ" | "QUESTION";
      quizzes: {
        id: number;
        questionMarkdown: string;
        optionOne: string;
        optionTwo: string;
        optionThree: string;
        optionFour: string;
        correctOption: "ONE" | "TWO" | "THREE" | "FOUR";
        explanationMarkdown: string;
      } | null;
      questions: {
        id: number;
        questionMarkdown: string;
      } | null;
    }[];
    userCompletedBlocks: {
      blockId: number;
    }[];
  }[];
};

export default function Lesson() {
  const searchParams = useSearchParams();
  const params: { lesson: string; slug: string; chapter: string } = useParams();
  const lessonNumber = parseInt(searchParams.get("l") ?? "1");

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
  }, [sectionQuery.data?.section]);

  const refetch = () => {
    sectionQuery.remove();
    sectionQuery.refetch();
  };

  return (
    <div>
      {section[lessonNumber - 1]?.blocks
        .sort((a, b) => a.order - b.order)
        .map((block, index) => {
          const markdown = (
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[slug, rehypeAutolinkHeadings]}
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
                  refetch={refetch}
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
            <div key={index} className={`${blockVisible ? "" : "hidden"}`}>
              <div id={block.id.toString() ?? 0}>{markdown}</div>
              {quiz}
              {section[lessonNumber - 1]?.blocks.length === block.order && (
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
                      href={`/courses/${params.slug}/chapter-${params.chapter}`}
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
      {/* <MDXRemote
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                },
              ],
            ],
          },
        }}
        source={"hey"}
      />
      {section[0]?.blocks[0]?.markdown ?? ""} */}
    </div>
  );
}

// {
/* {
        <MDXRemote
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                slug,
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: "wrap",
                  },
                ],
              ],
            },
          }}
          source={
            !sectionQuery.isLoading
              ? section[lessonNumber - 1]?.blocks[0]!.markdown ?? "some"
              : "none"
          }
        />
      } */
// }

// {
// }: {
//   section: {
//     section: {
//       id: number;
//       name: string;
//       order: number;
//       sectionId: number;
//       time: number;
//       blocks: {
//         id: number;
//         subSectionId: number;
//         order: number;
//         markdown: string;
//         interactiveComponents: {
//           type: "QUIZ" | "QUESTION";
//           quizzes: {
//             id: number;
//             questionMarkdown: string;
//             optionOne: string;
//             optionTwo: string;
//             optionThree: string;
//             optionFour: string;
//             correctOption: "ONE" | "TWO" | "THREE" | "FOUR";
//             explanationMarkdown: string;
//           } | null;
//           questions: {
//             id: number;
//             questionMarkdown: string;
//           } | null;
//         }[];
//         userCompletedBlocks: {
//           blockId: number;
//         }[];
//       }[];
//     }[];
//   };
// }
