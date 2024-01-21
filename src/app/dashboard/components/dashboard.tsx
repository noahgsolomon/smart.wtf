"use client";
import LatestActivity from "./latestactivity";
import NotesMenu from "@/app/notes/components/notesmenu/notesmenu";
import Streak from "./streak";
import LearningPath from "./learningpath/learningpath";

export default function Dashboard() {
  return (
    <div className="relative flex w-full flex-col gap-8 py-4">
      <div className="mx-auto w-full">
        <div className="hidden 2xl:block">
          <div className="relative flex w-full flex-row gap-4 rounded-lg">
            <div className="flex w-[70%] flex-grow flex-col">
              <div className="flex h-[775px] flex-col justify-between gap-4">
                <div className="flex h-full w-full gap-4">
                  <div className="w-[55%]">
                    <LatestActivity />
                  </div>
                  <div className="w-[45%]">
                    <NotesMenu />
                  </div>
                </div>
                <div className="rounded-lg bg-card/70 dark:bg-card/80">
                  <Streak />
                </div>
              </div>
            </div>
            <div className="flex w-[30%] flex-grow flex-col">
              <LearningPath />
            </div>
          </div>
        </div>
        <div className="hidden md:block 2xl:hidden">
          <div className="flex flex-col gap-4 rounded-lg">
            <div className="flex w-full gap-4">
              <div className="w-[55%]">
                <LatestActivity />
              </div>
              <div className="w-[45%]">
                <NotesMenu />
              </div>
            </div>
            <div>
              <div className="w-full">
                <LearningPath />
              </div>
            </div>
            <div className="rounded-lg bg-card/70 dark:bg-card/80">
              <Streak />
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <div className="flex flex-col gap-4 rounded-lg">
            <LatestActivity />
            <NotesMenu />
            <LearningPath />
            <Streak />
          </div>
        </div>
      </div>
    </div>
  );
}
