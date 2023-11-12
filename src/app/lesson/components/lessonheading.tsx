"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, X } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ThemeButton from "@/components/nav/theme";
import ChatButton from "@/components/nav/chatbutton";
import { cn } from "@/lib/utils";
import { type Section } from "@/types";

export default function LessonHeading({ section }: { section: Section[] }) {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const totalTime =
    section?.reduce((total, s) => {
      return total + s.time;
    }, 0) ?? 1;

  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex w-screen flex-row items-center justify-between border-b border-border bg-background  px-2 py-2 shadow-sm md:px-10">
      <a
        href={`/courses/${
          typeof params.slug === "string" ? params.slug : "unknown"
        }?chapter=${typeof params.chapter === "string" ? params.chapter : "1"}`}
        className={buttonVariants({ variant: "ghost" })}
      >
        <X className="h-4 w-4" />
      </a>
      <div className="flex h-4 w-[200px] flex-row gap-1 md:w-[400px] ">
        {section?.map((s) => {
          return (
            <HoverCard key={s.id} openDelay={0} closeDelay={0}>
              <Link
                className={`transition-all hover:opacity-80`}
                style={{
                  width: `${Math.round((s.time / totalTime) * 100.0)}%`,
                }}
                href={`?l=${s.order}`}
              >
                <HoverCardTrigger asChild>
                  <Progress
                    className={cn(
                      `h-full`,
                      searchParams.get("l") === s.order.toString()
                        ? "ring-2 ring-lightBlue"
                        : "",
                    )}
                    indicatorClassName="rounded-r-lg bg-blue"
                    value={
                      (s.blocks
                        .map((b) => (b.userCompletedBlocks.length > 0 ? 1 : 0))
                        .reduce((acc: number, curr) => acc + curr, 0) /
                        s.blocks.length) *
                      100
                    }
                  />
                </HoverCardTrigger>
              </Link>
              <HoverCardContent className="w-48">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{s.name}</h4>
                    <p className="flex flex-row items-center gap-1 text-sm">
                      <Clock className="h-3 w-3" />
                      {s.time} min
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>

      <div className="flex flex-row items-center gap-2">
        <ThemeButton className="hidden md:block" />
        <ChatButton query={`prev=${pathname}`} lesson={true} />
      </div>
    </div>
  );
}
