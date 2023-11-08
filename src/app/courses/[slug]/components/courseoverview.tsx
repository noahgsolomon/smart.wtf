import { api } from "@/trpc/server";
import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProgressSpinner from "@/components/progressspinner";
import ChapterButtons from "./chapterbuttons";

export default async function CourseOverview({
  params,
  searchParams,
}: {
  params: { slug: string; chapter: string };
  searchParams: { chapter: string };
}) {
  console.log("search params", searchParams);

  if (!searchParams.chapter) {
    redirect(`?chapter=1`);
  }

  const chapter =
    searchParams.chapter && Number.isInteger(parseInt(searchParams.chapter))
      ? parseInt(searchParams.chapter)
      : 1;

  const courseData = await api.course.getCourseBySlug.query({
    slug: params.slug,
  });

  const course = {
    ...courseData.course,
    courseChapters:
      courseData.course?.courseChapters
        .slice()
        .sort((a, b) => a.order - b.order) ?? [],
  };

  console.log("course", JSON.stringify(course, null, 2));

  if (course === null) {
    redirect("/404");
  }

  const chapterProgress = await api.course.getChapterProgress.query({
    courseId: course?.id ?? 0,
    chapter,
  });

  const chapterNum = course?.courseChapters[chapter - 1]?.order ?? 1;

  return (
    <div className="flex flex-col items-center justify-center gap-16 px-10 pb-8">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col text-center text-3xl">
          <p className="font-bold">Chapter {chapterNum}:</p>
          <h1 className="font-bold">
            {course?.courseChapters[chapter - 1]?.name}
          </h1>
        </div>
        <ChapterButtons
          chapterNum={chapterNum}
          chapterCount={course.chapters!}
        />
        {/* Section Links */}
        {course?.courseChapters[chapter - 1]?.courseChapterSections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <div
              key={index}
              className={`relative max-w-[350px] justify-center rounded-lg border border-border bg-card shadow-sm transition-all sm:max-w-none lg:w-[800px] ${
                section.implemented
                  ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
                  : "cursor-not-allowed"
              }`}
            >
              {!section.implemented && (
                <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center rounded-lg bg-black/30 dark:bg-black/50">
                  <Lock className="h-4 w-4" />
                </div>
              )}
              <div className="flex flex-col justify-between sm:flex-row">
                <div className="flex flex-col gap-2 px-4 py-2 sm:flex-row">
                  <div>
                    <h3 className="max-w-[20ch] text-base font-bold lg:text-lg">
                      {section.name}
                    </h3>
                    <p className="max-w-[40ch] text-xs lg:text-sm">
                      {section.description}
                    </p>
                  </div>
                  <ProgressSpinner
                    progress={
                      chapterProgress.data.find(
                        (s) => s.sectionId === section.id,
                      )?.percentageCompleted ?? 0
                    }
                  />
                </div>
                <div>
                  <Image
                    className="rounded-b-lg border-t border-t-border sm:w-[250px] sm:rounded-r-lg sm:rounded-bl-none sm:border-l sm:border-t-0 sm:border-border lg:w-[350px]"
                    width={350}
                    priority={true}
                    height={200}
                    src={section.imageUrl}
                    alt={section.name}
                  />
                </div>
              </div>
              {section.implemented && (
                <Link
                  className="absolute inset-0 z-20"
                  href={`/lesson/${course.slug}/${chapterNum}/${section.id}?l=1`}
                ></Link>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
