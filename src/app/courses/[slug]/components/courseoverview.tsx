import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import SectionCards from "./sectioncards";
import ChapterTitle from "./chaptertitle";

export default async function CourseOverview({
  params,
  searchParams,
}: {
  params: { slug: string; chapter: string };
  searchParams: { chapter: string };
}) {
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
        <ChapterTitle
          title={course?.courseChapters[chapter - 1]?.name ?? ""}
          chapterNum={chapterNum}
          chapters={course.chapters!}
        />
        <SectionCards
          chapter={chapter}
          chapterProgress={chapterProgress}
          courseData={courseData}
        />
      </div>
    </div>
  );
}
