import CopyButton from "./components/copybutton";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Quiz from "@/app/lesson/components/interactive/quiz";

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
          .map(async (block) => {
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

            return (
              <>
                {markdownContent}
                {quiz}
              </>
            );
          })}

        {section.section.length > subSection ? (
          <Link className={buttonVariants()} href={`?l=${subSection + 1}`}>
            Continue
          </Link>
        ) : (
          <Link
            className={buttonVariants()}
            href={`/courses/${params.slug}/chapter-${params.chapter}`}
          >
            Finish
          </Link>
        )}
      </div>
    </div>
  );
}
