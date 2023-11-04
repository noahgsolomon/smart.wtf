import CopyButton from "./components/copybutton";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import Quiz from "@/app/lesson/components/interactive/quiz";
import LessonButtons from "./components/lessonbuttons";
import Link from "next/link";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string; chapter: string; lesson: string };
  searchParams: { l: string };
}) {
  if (!searchParams.l) {
    redirect(`?l=1`);
  }

  const section = await api.course.getCourseSection.query({
    sectionId: parseInt(params.lesson),
  });

  if (section.section?.length === 0) redirect("/404");

  const subSection = parseInt(searchParams.l);

  if (
    isNaN(subSection) ||
    subSection < 0 ||
    subSection > (section.section?.length ?? 0)
  ) {
    redirect(`?l=1`);
  }

  if (section.section === null) redirect("/404");

  return (
    <div className="flex justify-center px-4 pb-4 pt-28">
      <div className="prose prose-slate relative px-8 py-2 dark:prose-invert">
        <CopyButton />

        {section.section[subSection - 1]?.blocks
          .sort((a, b) => a.order - b.order)
          .map(async (block, index) => {
            const { content: markdownContent } = await compileMDX({
              source: block.markdown,
              options: {
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
              },
            });

            const quiz = block.interactiveComponents.map(async (component) => {
              if (component.type === "QUIZ") {
                const { content: explanation } = await compileMDX({
                  source: component.quizzes?.explanationMarkdown ?? "",
                });
                const { content: question } = await compileMDX({
                  source: component.quizzes?.questionMarkdown ?? "",
                });
                return (
                  <Quiz
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
              block.order === 1 ||
              (index - 1 >= 0 &&
                section.section[subSection - 1]?.blocks[index - 1] &&
                (section.section[subSection - 1]?.blocks[index - 1]
                  ?.userCompletedBlocks.length ?? 0) > 0);

            console.log(
              "blockVisible",
              block.order,
              blockVisible,
              section.section[subSection - 1]?.blocks[index - 1]
                ?.userCompletedBlocks.length,
            );

            return (
              <div key={index} className={`${blockVisible ? "" : "hidden"}`}>
                <div id={block.id.toString() ?? 0}>{markdownContent}</div>
                {quiz}
                {blockVisible &&
                  section.section[subSection - 1]?.blocks.length ===
                    block.order && (
                    <Link
                      href={`${
                        section.section.length > subSection
                          ? `?l=${subSection + 1}`
                          : `/courses/${params.slug}/chapter-${params.chapter}`
                      }`}
                    >
                      <LessonButtons
                        block={block}
                        section={section}
                        subSection={subSection}
                      />
                    </Link>
                  )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
