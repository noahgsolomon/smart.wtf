import CourseOverview from "./courseoverview";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { chapter?: string };
}) {
  return (
    <div className="pt-32">
      <CourseOverview params={params} searchParams={searchParams} />
    </div>
  );
}
