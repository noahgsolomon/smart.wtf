"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import blazing from "public/blazing.png";
import { useEffect, useRef, useState } from "react";

type StreakData = {
  date: Date;
  activity: string;
};

const Streak = () => {
  const streakQuery = trpc.user.streak.useQuery();
  const [streak, setStreak] = useState<StreakData[]>([]);
  const currentDateRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setStreak(streakQuery.data?.streak ?? []);
  }, [streakQuery.isFetched]);

  useEffect(() => {
    if (currentDateRef.current) {
      currentDateRef.current.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "start",
      });
    }
  }, []);

  const generateDates = (year: number): Date[] => {
    const dates: Date[] = [];
    const date = new Date(year, 0, 1);
    while (date.getFullYear() === year) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const streakCalendar = () => {
    const dates = generateDates(new Date().getFullYear());
    const groupedDates: Record<number, Date[]> = dates.reduce(
      (acc, date) => {
        const dayOfWeek = date.getDay();
        if (!acc[dayOfWeek]) {
          acc[dayOfWeek] = [];
        }
        acc[dayOfWeek]?.push(date);
        return acc;
      },
      {} as Record<number, Date[]>,
    );

    return (
      <ul className="flex flex-col gap-x-[0.1rem] gap-y-[0.2rem] pr-2">
        {Object.keys(groupedDates).map((key) => {
          return (
            <div className="flex flex-row  gap-x-[0.1rem] gap-y-[0.15rem]">
              {groupedDates[parseInt(key)]?.map((date, index) => {
                const streakDate = streak.find(
                  (streakDate) =>
                    streakDate.date.toDateString() === date.toDateString(),
                );
                const isToday =
                  date.toDateString() === new Date().toDateString();

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <li
                        ref={isToday ? currentDateRef : null}
                        data-level="0"
                        className={`rounded-sm  p-[0.4rem] ${
                          streakDate
                            ? "bg-success opacity-80"
                            : "bg-primary opacity-20"
                        } transition-all hover:opacity-30`}
                      ></li>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{date.toLocaleDateString()}</p>
                      <p>{streakDate ? streakDate.activity : "no activity"}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="relative">
      <TooltipProvider delayDuration={0}>
        <div className="absolute left-1 top-1 z-50 pb-4">
          <Tooltip>
            <TooltipTrigger>
              <div className="flex cursor-pointer items-end gap-2 transition-all hover:scale-105">
                <Image
                  className="object-contain"
                  width={50}
                  height={50}
                  src={blazing}
                  alt={"fire fish"}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>Let's get that streak going!</TooltipContent>
          </Tooltip>
        </div>

        <div className="relative flex">
          <div className="overflow-x-auto overflow-y-hidden rounded-md border border-border bg-card p-2 px-5 pb-5 md:p-5">
            <div className="absolute bottom-0 right-0 top-0 z-10 my-4 border-r border-border bg-card pl-[10px]"></div>
            <div className="absolute bottom-0 right-[10px] top-0 z-10 my-4 pl-[10px] backdrop-blur-[1px]"></div>

            <div className="absolute bottom-0 left-0 top-0 z-10 my-4 border-l border-border bg-card pl-[10px]"></div>
            <div className="absolute bottom-0 left-[10px] top-0 z-10 my-4 pl-[10px] backdrop-blur-[1px]"></div>

            <ul className="flex w-[800px] flex-nowrap pb-2 pl-10 text-sm">
              <li className="w-[68px]">Jan</li>
              <li className="w-[68px]">Feb</li>
              <li className="w-[68px]">Mar</li>
              <li className="w-[68px]">Apr</li>
              <li className="w-[68px]">May</li>
              <li className="w-[68px]">Jun</li>
              <li className="w-[68px]">Jul</li>
              <li className="w-[68px]">Aug</li>
              <li className="w-[68px]">Sep</li>
              <li className="w-[68px]">Oct</li>
              <li className="w-[68px]">Nov</li>
              <li className="w-[68px]">Dec</li>
            </ul>

            <div className="flex flex-row gap-2">
              <ul className="days flex flex-col gap-4 pt-4 text-xs">
                <li>Mon</li>
                <li>Wed</li>
                <li>Fri</li>
              </ul>
              {streakCalendar()}
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Streak;
