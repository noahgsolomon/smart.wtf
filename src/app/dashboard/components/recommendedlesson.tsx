"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSound from "use-sound";

export default function RecommendedLesson() {
  const [click] = useSound("/click.mp3", { volume: 0.5 });

  return (
    <div className="flex w-full flex-col items-center gap-2 md:w-auto">
      <div className="flex w-full">
        <div className="flex w-full flex-col gap-4 rounded-lg border border-border bg-card p-4 md:w-auto">
          <div className="w-full md:w-[400px]">
            <Image
              src={"https://images.codefoli.com/systems-design-1-1.png"}
              alt="lesson"
              width={700}
              className="w-full rounded-lg"
              height={200}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3>Systems Design</h3>
            <p className="max-w-[30ch] text-base">
              Introduction to Systems Design: Concepts and Importance
            </p>
            <p className="text-sm opacity-80">Lesson 1 of 40</p>
          </div>
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
            Start lesson <ArrowRightCircle className=" h-5 w-5 pl-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
