import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import ChapterButtons from "./chapterbuttons";
import SectionCards from "./sectioncards";

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

  const course = courseData.course;

  console.log(JSON.stringify(course, null, 2));

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
        <SectionCards
          chapter={chapter}
          chapterProgress={chapterProgress}
          courseData={courseData}
        />
      </div>
    </div>
  );
}
