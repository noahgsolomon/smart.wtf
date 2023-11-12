import { Suspense } from "react";
import CourseOverview from "./components/courseoverview";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string; chapter: string };
  searchParams: { chapter: string };
}) {
  return (
    <div>
      <Suspense fallback={<></>}>
        <CourseOverview searchParams={searchParams} params={params} />
      </Suspense>
    </div>
  );
}
