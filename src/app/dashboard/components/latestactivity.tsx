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
import { Badge } from "@/components/ui/badge";

export default function LatestActivity() {
  const latestQuery = trpc.course.getLatestActivity.useQuery();

  const latest = latestQuery.data;

  const [click] = useSound("/click.mp3", { volume: 0.5 });

  //@ts-ignore
  if (!latestQuery.isLoading && latest && !latest.latest) {
    console.log(true);
    return <RecommendedLesson />;
  }

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80 md:w-auto">
      <Badge
        className="absolute -right-6 -top-2 z-30 p-1 text-sm"
        variant={"arts"}
      >
        Coming soon
      </Badge>
      {process.env.NEXT_PUBLIC_ENV === "PROD" ? (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center rounded-lg bg-primary/30"></div>
      ) : null}

      <div className="w-full">
        {latestQuery.isLoading && (
          <AspectRatio ratio={7 / 4}>
            <Skeleton className={`h-full w-full rounded-lg`}></Skeleton>
          </AspectRatio>
        )}
        <Image
          src={
            latestQuery.isLoading || !latest
              ? "https://images.codefoli.com/systems-design-1-1.png"
              : latest.latest.courseChapterSections?.imageUrl ??
                "https://images.codefoli.com/systems-design-1-1.png"
          }
          priority={true}
          alt="lesson"
          width={700}
          height={200}
          className={`max-w-full rounded-lg ${
            latestQuery.isLoading || !latest?.latest
              ? "h-0 w-0 max-w-0 opacity-0"
              : "opacity-100"
          }`}
        />
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
            <p className="hidden max-w-[30ch] text-base md:block">
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
            indicatorClassName="bg-blue/80 rounded-r-lg"
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
            Continue
            <ArrowRightCircle className=" h-5 w-5 pl-1" />
          </Link>
        </>
      )}
    </div>
  );
}
