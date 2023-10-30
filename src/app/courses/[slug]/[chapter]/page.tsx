import { Suspense } from "react";
import CourseOverview from "./components/courseoverview";
import CourseOverviewSkeleton from "./components/courseoverviewskeleton";

export default function Page({
  params,
}: {
  params: { slug: string; chapter: string };
}) {
  return (
    <div>
      <Suspense fallback={<CourseOverviewSkeleton />}>
        <CourseOverview params={params} />
      </Suspense>
    </div>
  );
}
