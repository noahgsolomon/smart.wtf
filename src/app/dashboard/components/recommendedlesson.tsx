"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import useSound from "use-sound";

export default function RecommendedLesson() {
  const [click] = useSound("/click.mp3", { volume: 0.5 });

  return (
    <div className="relative flex h-full w-full flex-col justify-between rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80 md:w-auto ">
      <Badge
        className="absolute -right-6 -top-2 z-30 p-1 text-sm"
        variant={"arts"}
      >
        Coming soon
      </Badge>
      {process.env.NEXT_PUBLIC_ENV === "PROD" ? (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center rounded-lg"></div>
      ) : null}
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <Image
            src={"https://images.codefoli.com/systems-design-1-1.png"}
            alt="lesson"
            width={700}
            className="max-h-[275px] max-w-full rounded-lg"
            height={200}
            priority={true}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3>Systems Design</h3>
          <p className="max-w-[30ch] text-base">
            Introduction to Systems Design: Concepts and Importance
          </p>
          <p className="text-sm opacity-80">Lesson 1 of 40</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Progress
          className="h-4 border-2 border-border"
          indicatorClassName="bg-blue rounded-r-lg"
          value={0}
        />
        <Link
          onClick={() => click()}
          href={`/lesson/systems-design/1/25?l=1`}
          className={cn(buttonVariants(), `transition-all`)}
        >
          Start lesson
        </Link>
      </div>
    </div>
  );
}
