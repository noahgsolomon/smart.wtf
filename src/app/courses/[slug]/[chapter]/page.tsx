import { Suspense } from "react";
import CourseOverview from "./components/courseoverview";
import CourseOverviewSkeleton from "./components/courseoverviewskeleton";

export default function Page({
  params,
}: {
  params: { slug: string; chapter: string };
}) {
  return (
    <div className="pt-32">
      <Suspense fallback={<CourseOverviewSkeleton />}>
        <CourseOverview params={params} />
      </Suspense>
    </div>
  );
}
