import { Suspense } from "react";
import CourseOverview from "./components/courseoverview";
import CourseOverviewSkeleton from "./components/courseoverviewskeleton";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string; chapter: string };
  searchParams: { chapter: string };
}) {
  return (
    <div>
      <Suspense fallback={<CourseOverviewSkeleton />}>
        <CourseOverview searchParams={searchParams} params={params} />
      </Suspense>
    </div>
  );
}
