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
  dailyEngagementCount: number;
  count: number;
};

const roundToNearestTen = (num: number) => {
  num += 5;
  return Math.min(Math.floor(num / 10) * 10, 100);
};

const Streak = () => {
  const streakQuery = trpc.user.streak.useQuery();
  const [streak, setStreak] = useState<StreakData[]>([]);
  const [currentStreakCount, setCurrentStreakCount] = useState(0);
  const currentDateRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setStreak(streakQuery.data?.streak ?? []);
  }, [streakQuery.isFetched, streakQuery.data?.streak]);

  useEffect(() => {
    const todayStreak = streak.find((streakDate) => {
      const today = new Date();
      const todayDate = new Date(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate(),
      ).toUTCString();

      const streakDateUTC = new Date(
        streakDate.date.getUTCFullYear(),
        streakDate.date.getUTCMonth(),
        streakDate.date.getUTCDate(),
      ).toUTCString();

      return streakDateUTC === todayDate;
    });

    if (todayStreak) {
      setCurrentStreakCount(todayStreak.count);
    }
  }, [streak]);

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
            <div
              key={key}
              className="flex flex-row  gap-x-[0.1rem] gap-y-[0.15rem]"
            >
              {groupedDates[parseInt(key)]?.map((date, index) => {
                const streakDate = streak.find((streakDate) => {
                  return (
                    new Date(
                      streakDate.date.getUTCFullYear(),
                      streakDate.date.getUTCMonth(),
                      streakDate.date.getUTCDate(),
                    ).toUTCString() ===
                    new Date(
                      date.getUTCFullYear(),
                      date.getUTCMonth(),
                      date.getUTCDate(),
                    ).toUTCString()
                  );
                });

                const today = new Date();
                const todayDate = new Date(
                  today.getUTCFullYear(),
                  today.getUTCMonth(),
                  today.getUTCDate(),
                ).toUTCString();
                const isToday =
                  new Date(
                    date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate(),
                  ).toUTCString() === todayDate;

                const dailyEngagementCount = streakDate?.dailyEngagementCount;

                return (
                  <Tooltip key={index}>
                    <TooltipTrigger>
                      <li
                        ref={isToday ? currentDateRef : null}
                        data-level="0"
                        className={`rounded-sm  p-[0.4rem] ${
                          streakDate
                            ? `bg-success opacity-${roundToNearestTen(
                                (dailyEngagementCount ?? 0) + 40,
                              )}`
                            : "bg-primary opacity-20"
                        } transition-all hover:opacity-30`}
                      ></li>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{date.toLocaleDateString()}</p>
                      {streakDate && (
                        <p>{streakDate.dailyEngagementCount} engagements</p>
                      )}
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
        <div className="absolute left-1 top-1 z-[15] pb-4">
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
        <div className="absolute right-2 top-2 z-[15] pb-4">
          <Tooltip>
            <TooltipTrigger>
              <div className="flex cursor-pointer items-end gap-2 transition-all hover:scale-105">
                <div className="rounded-lg border border-border bg-primary">
                  <p className="px-2 py-1 text-secondary">
                    🔥 {currentStreakCount}
                  </p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>Your current streak</TooltipContent>
          </Tooltip>
        </div>

        <div className="relative flex">
          <div className="overflow-x-auto overflow-y-hidden rounded-b-lg bg-card p-2 px-5 pb-5 md:p-5">
            <div className="absolute bottom-0 right-0 top-0 z-10 my-4 bg-card pl-[10px]"></div>
            <div className="absolute bottom-0 right-[10px] top-0 z-10 my-4 pl-[10px] backdrop-blur-[1px]"></div>

            <div className="absolute bottom-0 left-0 top-0 z-10 my-4 bg-card pl-[10px]"></div>
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
