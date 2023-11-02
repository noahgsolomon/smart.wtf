"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import blazing from "public/blazing.png";
import ThemeButton from "./theme";
import ChatButton from "./chatbutton";
import { usePathname } from "next/navigation";
import { CalendarIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function LessonHeading() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex w-screen flex-row items-center justify-between border border-b-border  bg-background py-2 shadow-sm md:px-10">
      <Link href={"/courses/"} className={buttonVariants({ variant: "ghost" })}>
        <X className="h-4 w-4" />
      </Link>
      <div className="flex h-4 w-[400px] flex-row ">
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <Progress
              indicatorClassName="rounded-r-lg "
              value={100}
              className="h-full w-[20%] cursor-pointer border border-border transition-all hover:opacity-80"
            />
          </HoverCardTrigger>
          <HoverCardContent className="w-48">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">
                  Introduction to System Design
                </h4>
                <p className="flex flex-row items-center gap-1 text-sm">
                  <Clock className="h-3 w-3" />5 min
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <Progress
              indicatorClassName="rounded-r-lg "
              value={50}
              className="h-full w-[40%] cursor-pointer border border-border transition-all hover:opacity-80"
            />
          </HoverCardTrigger>
          <HoverCardContent className="w-48">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">
                  The Living Organism of a System
                </h4>
                <p className="flex flex-row items-center gap-1 text-sm">
                  <Clock className="h-3 w-3" />
                  20 min
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <Progress
              indicatorClassName="rounded-r-lg"
              value={0}
              className="h-full w-[50%] cursor-pointer border border-border transition-all hover:opacity-80"
            />
          </HoverCardTrigger>
          <HoverCardContent className="w-48">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">Course Overview</h4>
                <p className="flex flex-row items-center gap-1 text-sm">
                  <Clock className="h-3 w-3" />
                  25 min
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
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
