import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DemoNotesMenu from "@/components/demo/demonotesmenu";
import DemoLatestActivity from "@/components/demo/demolatestactivity";
import DemoStreak from "@/components/demo/demostreak";
import DemoLearningPath from "@/components/demo/demolearningpath";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const user = auth();

  if (user?.userId) {
    redirect("/dashboard");
  }

  return (
    <main className="relative mt-6 flex flex-col items-center justify-center gap-4">
      <div className="mt-[100px] flex w-[90%] flex-col items-center justify-center bg-opacity-60 text-4xl lg:w-[80%] xl:w-[75%]">
        <div className="flex flex-col items-center justify-center gap-8 pb-8">
          <div className=" flex flex-col items-center gap-2">
            <Badge className="text-lg md:hidden" variant={"math"}>
              BETA
            </Badge>
            <h1 className="relative max-w-[10ch] text-center text-5xl font-bold lg:text-6xl">
              SMART.WTF
              <Badge
                className="absolute -top-8 hidden text-lg md:-right-12 md:block"
                variant={"math"}
              >
                BETA
              </Badge>
            </h1>
          </div>
        </div>
        <div className="relative flex w-full flex-col gap-8 py-4">
          <div className="mx-auto w-full">
            <div className="hidden 2xl:block">
              <div className="relative flex w-full flex-row gap-4 rounded-lg">
                <div className="flex w-[70%] flex-grow flex-col">
                  <div className="flex h-[775px] flex-col justify-between gap-4">
                    <div className="flex h-full w-full gap-4">
                      <div className="w-[60%]">
                        <DemoLatestActivity />
                      </div>
                      <div className="w-[40%]">
                        <DemoNotesMenu />
                      </div>
                    </div>
                    <div className="rounded-lg bg-card/70 dark:bg-card/80">
                      <DemoStreak />
                    </div>
                  </div>
                </div>
                <div className="flex w-[30%] flex-grow flex-col">
                  <DemoLearningPath />
                </div>
              </div>
            </div>
            <div className="hidden md:block 2xl:hidden">
              <div className="flex flex-col gap-4 rounded-lg">
                <div className="flex w-full gap-4">
                  <div className="w-[55%]">
                    <DemoLatestActivity />
                  </div>
                  <div className="w-[45%]">
                    <DemoNotesMenu />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <DemoLearningPath />
                  </div>
                </div>
                <div className="rounded-lg bg-card/70 dark:bg-card/80">
                  <DemoStreak />
                </div>
              </div>
            </div>
            <div className="block md:hidden">
              <div className="flex flex-col gap-4 rounded-lg">
                <DemoLatestActivity />
                <DemoNotesMenu />
                <DemoLearningPath />
                <DemoStreak />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
