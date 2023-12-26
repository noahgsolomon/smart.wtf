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
      <div className="hidden xl:block">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full rounded-lg border bg-card"
        >
          <ResizablePanel defaultSize={65} defaultValue={35}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanelGroup
                direction="horizontal"
                className="w-full min-w-[600px]"
              >
                <ResizablePanel className="min-w-[320px]">
                  <LatestActivity />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="min-w-[320px] bg-card">
                  <NotesMenu />
                </ResizablePanel>
              </ResizablePanelGroup>
              <ResizablePanelGroup
                className="max-h-[175px] border-t"
                direction="horizontal"
              >
                <ResizablePanel>
                  <div className="flex w-full flex-col gap-2">
                    <Streak />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={35}
            defaultValue={35}
            className="min-w-[300px] max-w-[400px]"
          >
            <LearningPath />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="hidden md:block xl:hidden">
        <ResizablePanelGroup className="rounded-lg border" direction="vertical">
          <ResizablePanelGroup direction="horizontal" className="w-full">
            <ResizablePanel className="min-w-[320px]">
              <LatestActivity />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="min-w-[320px] bg-card">
              <NotesMenu />
            </ResizablePanel>
          </ResizablePanelGroup>
          <ResizablePanelGroup className="border-t" direction="horizontal">
            <ResizablePanel className="w-full">
              <LearningPath />
            </ResizablePanel>
          </ResizablePanelGroup>
          <ResizablePanelGroup
            className="max-h-[175px] border-t"
            direction="horizontal"
          >
            <ResizablePanel>
              <div className="flex w-full flex-col gap-2">
                <Streak />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanelGroup>
      </div>
      <div className="block md:hidden">
        <ResizablePanelGroup className="rounded-lg border" direction="vertical">
          <ResizablePanelGroup direction="horizontal" className="w-full">
            <ResizablePanel className="min-w-[320px]">
              <LatestActivity />
            </ResizablePanel>
          </ResizablePanelGroup>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="min-w-[320px] bg-card">
              <NotesMenu />
            </ResizablePanel>
          </ResizablePanelGroup>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
              <LearningPath />
            </ResizablePanel>
          </ResizablePanelGroup>
          <ResizablePanelGroup
            className="max-h-[175px] border-t"
            direction="horizontal"
          >
            <ResizablePanel>
              <div className="flex w-full flex-col gap-2">
                <Streak />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
