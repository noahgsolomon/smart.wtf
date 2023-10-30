import { Button, buttonVariants } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { Slash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SidebarCurrentSection({
  params,
}: {
  params: { slug: string; chapter: string };
}) {
  const course = (
    await api.course.getCourseBySlug.query({
      slug: params.slug,
      chapter: 1,
    })
  ).course;

  const chapter = 1;

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-4">
      <Image
        width={210}
        height={120}
        className="rounded-lg border border-border"
        alt="current lesson"
        src={
          course?.courseChapters[0]?.courseChapterSections[chapter - 1]
            ?.imageUrl ?? ""
        }
      />
      <div className="flex flex-row items-center">
        <Link
          className={buttonVariants({ variant: "link" })}
          href={"/courses/web-optimization"}
        >
          Web Opimization
        </Link>{" "}
        <Slash className="h-4 w-4" />
        <Link
          className={buttonVariants({ variant: "link" })}
          href={"/courses/web-optimization/chapter-1"}
        >
          Chapter 1
        </Link>
      </div>
      <h1 className="max-w-[15ch] text-2xl font-bold">
        Unlock the Power of Web Performance
      </h1>
      <Button>Begin</Button>
    </div>
  );
}
