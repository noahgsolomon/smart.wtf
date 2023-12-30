"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSound from "use-sound";

export default function DemoLatestActivity() {
  const [click] = useSound("/click.mp3", { volume: 0.5 });

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border bg-card/70 p-4 shadow-md dark:bg-card/80 md:w-auto">
      <div className="w-full">
        <Image
          src={"https://images.codefoli.com/systems-design-1-1.png"}
          priority={true}
          alt="lesson"
          width={700}
          height={200}
          className={`max-w-full rounded-lg`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <>
          <h3>Systems Design</h3>
          <p className="hidden max-w-[30ch] text-base md:block">Lesson</p>
          <p className="text-sm opacity-80">Lesson 1 of 40</p>
        </>
      </div>

      <>
        <Progress
          className="h-4 border-2 border-border"
          indicatorClassName="bg-blue/80 rounded-r-lg"
          value={50}
        />
        <Link
          href={"/signup"}
          onClick={() => click()}
          className={cn(buttonVariants(), `transition-all`)}
        >
          Continue
          <ArrowRightCircle className=" h-5 w-5 pl-1" />
        </Link>
      </>
    </div>
  );
}
