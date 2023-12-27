"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LatestActivity from "./latestactivity";
import NotesMenu from "@/app/notes/components/notesmenu";
import Streak from "./streak";
import LearningPath from "./learningpath/learningpath";

export default function Dashboard() {
  return (
    <div>
      <div className="hidden 2xl:block">
        <div className="flex w-full flex-row gap-4 rounded-lg">
          <div className="w-[70%]">
            <div className="flex flex-col gap-4">
              <div className="flex w-full gap-4">
                <div className="w-[60%]">
                  <LatestActivity />
                </div>
                <div className="w-[40%]">
                  <NotesMenu />
                </div>
              </div>
              <Streak />
            </div>
          </div>
          <div className="w-[30%]">
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
          <Streak />
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
  );
}
