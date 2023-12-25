"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSound from "use-sound";
import RecommendedLesson from "./recommendedlesson";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function LatestActivity() {
  const latestQuery = trpc.course.getLatestActivity.useQuery();

  const latest = latestQuery.data;

  const [click] = useSound("/click.mp3", { volume: 0.5 });

  if (latestQuery.isLoading && latest && !latest.latest.id) {
    return <RecommendedLesson />;
  }

  return (
    <div className="flex w-full flex-col gap-4 bg-card p-4 md:w-auto">
      <div className="w-full">
        {latestQuery.isLoading || !latest ? (
          <AspectRatio ratio={7 / 4}>
            <Skeleton className={`h-full w-full rounded-lg`}></Skeleton>
          </AspectRatio>
        ) : (
          <Image
            src={
              latest.latest.courseChapterSections?.imageUrl ??
              "https://images.codefoli.com/systems-design-1-1.png"
            }
            priority={true}
            alt="lesson"
            width={700}
            height={200}
            className="max-w-full rounded-lg"
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        {latestQuery.isLoading || !latest ? (
          <>
            <Skeleton className="h-12 w-24 rounded-lg"></Skeleton>
            <Skeleton className="h-6 w-[75%] rounded-lg"></Skeleton>
            <Skeleton className="h-6 w-12 rounded-lg"></Skeleton>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      {latestQuery.isLoading || !latest ? (
        <>
          <Skeleton className="h-6 w-full rounded-full"></Skeleton>
          <Skeleton className="h-8 w-full rounded-lg"></Skeleton>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
