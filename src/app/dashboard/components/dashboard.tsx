"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LatestActivity from "./latestactivity";
import NotesMenu from "@/app/notes/components/notesmenu";
import Streak from "./streak";

export default function Dashboard() {
  return (
    <div>
      <ResizablePanelGroup
        direction="vertical"
        className="max-w-[800px] rounded-lg border"
      >
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] max-w-[800px] "
        >
          <ResizablePanel className="min-w-[320px]">
            <LatestActivity />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="min-w-[320px] bg-card">
            <NotesMenu />
          </ResizablePanel>
        </ResizablePanelGroup>
        <ResizablePanelGroup className="border-t" direction="horizontal">
          <ResizablePanel>
            <div className="flex w-full flex-col gap-2">
              <Streak />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanelGroup>
    </div>
  );
}
