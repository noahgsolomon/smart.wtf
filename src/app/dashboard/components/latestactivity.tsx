"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LatestActivitySkeleton from "./latestactivityskeleton";
import useSound from "use-sound";
import RecommendedLesson from "./recommendedlesson";

export default function LatestActivity() {
  const latestQuery = trpc.course.getLatestActivity.useQuery();

  const latest = latestQuery.data;

  const [click] = useSound("/click.mp3");

  if (latestQuery.isLoading || !latest) {
    return <LatestActivitySkeleton />;
  }

  if (!latest.latest.id) {
    return <RecommendedLesson />;
  }

  return (
    <div className="flex flex-col gap-2">
      <h4>Recommended Lessons</h4>
      <div className="flex">
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
          <div>
            <Image
              src={
                latest.latest.courseChapterSections?.imageUrl ??
                "https://images.codefoli.com/systems-design-1-1.png"
              }
              priority={true}
              alt="lesson"
              width={400}
              className="rounded-lg "
              height={200}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3>
              {latest.latest.courseChapterSections?.course.name ??
                "Systems Design"}
            </h3>
            <p className="max-w-[30ch] text-base">
              {latest.latest.courseChapterSections?.name ?? "Lesson"}
            </p>
            <p className="text-sm opacity-80">
              Lesson {latest.latest.courseChapterSections?.lessonNumber} of{" "}
              {latest.latest.courseChapterSections?.course.lessons}
            </p>
          </div>
          <Progress
            className="h-4 border-2 border-border"
            indicatorClassName="bg-blue rounded-r-lg"
            value={latest.latest.percentageCompleted ?? 50}
          />
          <Link
            onClick={() => click()}
            href={`/lesson/${latest.latest.courseChapterSections?.course
              .slug}/${latest.latest.courseChapterSections?.courseChapters
              .order}/${latest.latest.sectionId}?l=${
              latest.latest.subSections?.order ?? 1
            }&b=${latest.latest.blockId}`}
            className={cn(buttonVariants(), `transition-all`)}
          >
            Continue where you left off{" "}
            <ArrowRightCircle className=" h-5 w-5 pl-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
