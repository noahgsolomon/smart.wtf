import { api } from "@/trpc/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function CourseOverview({
  params,
}: {
  params: { slug: string; chapter: string };
}) {
  const chapter =
    params.chapter.split("chapter-")[1]! &&
    Number.isInteger(parseInt(params.chapter.split("chapter-")[1]!))
      ? parseInt(params.chapter.split("chapter-")[1]!)
      : 1;

  const course = (
    await api.course.getCourseBySlug.query({
      slug: params.slug,
      chapter,
    })
  ).course;

  const chapterNum = course?.courseChapters[0]?.order ?? 1;

  return (
    <div className="flex flex-col items-center justify-center gap-16 px-10 pb-8">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col gap-4 text-center text-3xl">
          <p>Chapter {chapterNum}:</p>
          <h1>{course?.courseChapters[0]?.name}</h1>
        </div>

        {course?.courseChapters[0]?.courseChapterSections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => {
            return (
              <Link
                key={index}
                href={"?something=idk"}
                className="relative max-w-[350px] cursor-pointer justify-center rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:max-w-none lg:w-[800px]"
              >
                {/* {(chapterNum !== 1 || index !== 0) && (
                  <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-black/30 dark:bg-black/50">
                    <Lock className="h-4 w-4" />
                  </div>
                )} */}
                <div className=" flex flex-col justify-between sm:flex-row">
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <h3 className="max-w-[20ch] text-base lg:text-lg">
                      {section.name}
                    </h3>
                    <p className="max-w-[40ch] text-xs lg:text-sm">
                      {section.description}
                    </p>
                  </div>
                  <div>
                    <Image
                      className="rounded-b-lg border-t border-t-border sm:w-[250px] sm:rounded-r-lg sm:rounded-bl-none sm:border-l sm:border-t-0 sm:border-border lg:w-[350px]"
                      width={350}
                      height={200}
                      src={section.imageUrl}
                      alt={section.imageUrl}
                    />
                  </div>
                </div>
              </Link>
            );
          })}

        <div className="flex flex-row justify-center gap-2">
          {chapterNum > 1 && (
            <Link
              className={cn(
                buttonVariants(),
                "flex flex-row gap-1 transition-all hover:gap-2",
              )}
              href={`chapter-${chapterNum - 1}`}
            >
              <ArrowLeft className="h-4 w-4" />
              Chapter {chapterNum - 1}{" "}
            </Link>
          )}
          {(course?.chapters ?? 1) > chapterNum && (
            <Link
              className={cn(
                buttonVariants(),
                "flex flex-row gap-1 transition-all hover:gap-2",
              )}
              href={`chapter-${chapterNum + 1}`}
            >
              Chapter {chapterNum + 1} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
