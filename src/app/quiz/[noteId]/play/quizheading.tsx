"use client";

import ThemeButton from "@/components/nav/theme";
import { buttonVariants } from "@/components/ui/button";
import { type CarouselApi } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { type RouterOutput } from "@/trpc/client";
import { X } from "lucide-react";
import Link from "next/link";

export default function QuizHeading({
  questions,
  current,
  completed,
  api,
}: {
  current: number;
  questions: RouterOutput["quiz"]["getQuestions"];
  completed: Record<number, boolean>;
  api: CarouselApi | undefined;
}) {
  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex w-screen flex-row items-center justify-between border-b border-border bg-card  px-2 py-2 md:px-10">
      <Link
        href={`/dashboard`}
        className={buttonVariants({ variant: "ghost" })}
      >
        <X className="h-4 w-4" />
      </Link>
      <TooltipProvider delayDuration={0}>
        <div className="flex h-4 w-[200px] flex-row gap-1 md:w-[400px]">
          {questions &&
            questions.available &&
            questions.questions?.map((question, index) => (
              <Tooltip key={question.id}>
                <TooltipTrigger asChild>
                  <Progress
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      `h-full cursor-pointer transition-all hover:scale-[102%] hover:opacity-90 active:scale-[98%]`,
                      index === current ? "ring-2 ring-lightBlue" : "",
                    )}
                    indicatorClassName="rounded-r-lg"
                    value={completed[index] ? 100 : 0}
                  />
                </TooltipTrigger>
                <TooltipContent>Question {index + 1}</TooltipContent>
              </Tooltip>
            ))}
        </div>
      </TooltipProvider>
      <div className="flex flex-row items-center gap-2">
        <ThemeButton className="hidden md:block" />
      </div>
    </div>
  );
}
