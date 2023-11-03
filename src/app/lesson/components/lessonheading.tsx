"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import blazing from "public/blazing.png";
import { useParams, usePathname } from "next/navigation";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { trpc } from "@/trpc/client";
import ThemeButton from "@/components/nav/theme";
import ChatButton from "@/components/nav/chatbutton";

export default function LessonHeading() {
  const pathname = usePathname();
  const params = useParams();

  const section = trpc.course.getCourseSection.useQuery({
    sectionId: parseInt(
      params.lesson && typeof params.lesson === "string" ? params.lesson : "1",
    ),
  }).data?.section;

  const totalTime =
    section?.reduce((total, s) => {
      return total + s.time;
    }, 0) ?? 1;

  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex w-screen flex-row items-center justify-between border border-b-border  bg-background py-2 shadow-sm md:px-10">
      <Link
        href={`/courses/${
          typeof params.slug === "string" ? params.slug : "unknown"
        }/chapter-${typeof params.chapter === "string" ? params.chapter : "1"}`}
        className={buttonVariants({ variant: "ghost" })}
      >
        <X className="h-4 w-4" />
      </Link>
      <div className="flex h-4 w-[400px] flex-row ">
        {section?.map((s) => {
          console.log(Math.round((s.time / totalTime) * 100.0));
          return (
            <HoverCard key={s.id} openDelay={0} closeDelay={0}>
              <Link
                className={` transition-all hover:opacity-80`}
                style={{
                  width: `${Math.round((s.time / totalTime) * 100.0)}%`,
                }}
                href={`?l=${s.order}`}
              >
                <HoverCardTrigger asChild>
                  <Progress
                    className="h-full border border-border"
                    indicatorClassName="rounded-r-lg "
                    value={0}
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
        <div className="cursor-pointer transition-all hover:scale-105">
          <Image
            className="m-1"
            width={30}
            height={30}
            src={blazing}
            alt="streak"
          />
        </div>
      </div>
    </div>
  );
}
