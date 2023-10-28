import CourseOverview from "./courseoverview";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="pt-32">
      <CourseOverview params={params} />
    </div>
  );
}
