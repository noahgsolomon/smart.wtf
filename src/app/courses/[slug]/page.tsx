import { redirect } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
  redirect(`/courses/${params.slug}/chapter-1`);
  return <></>;
}
