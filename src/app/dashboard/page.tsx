import { api } from "@/trpc/server";
import cool from "public/cool.png";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";
import CalculusOverview from "./components/calculusoverview";
import Courses from "./components/courses/courses";
import { Suspense } from "react";
import { CourseSkeleton } from "./components/courses/courseskeleton";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const Dashboard = async () => {
  const user = (await api.user.user.query()).user;

  const latest = await api.course.getLatestActivity.query();

  console.log(latest);

  return (
    <>
      <main className="mx-5 mt-32 md:mx-20">
        <div>
          <section className="py-10">
            <div className="flex flex-col justify-between gap-8">
              <div className="flex flex-row items-center gap-2">
                <h3 className="text-4xl">Welcome back, {user?.name}</h3>
                <Image width={50} height={50} src={cool} alt="wave emoji" />
              </div>
              <div className="flex flex-col gap-2">
                <h4>Pick up where you left off</h4>
                <div className="flex">
                  <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
                    <div className="">
                      <Image
                        src={
                          latest.latest.courseChapterSections?.imageUrl ??
                          "https://images.codefoli.com/systems-design-1-1.png"
                        }
                        alt="lesson"
                        width={400}
                        className="rounded-lg "
                        height={200}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3>
                        {latest.latest.courseChapterSections?.course.name ??
                          "Systems Design"}
                      </h3>
                      <p className="max-w-[30ch] text-base">
                        {latest.latest.courseChapterSections?.name ?? "Lesson"}
                      </p>
                      <p className="text-sm opacity-80">
                        Lesson x of 40 {"(unimplemented)"}
                      </p>
                    </div>
                    <Progress
                      className="h-4 border-2 border-border"
                      indicatorClassName="bg-blue rounded-r-lg"
                      value={latest.latest.percentageCompleted ?? 50}
                    />
                    <Link
                      href={`/lesson/${latest.latest.courseChapterSections
                        ?.course.slug}/${latest.latest.courseChapterSections
                        ?.courseChapters.order}/${latest.latest.sectionId}?l=${
                        latest.latest.subSections?.order ?? 1
                      }`}
                      className={cn(buttonVariants(), `transition-all`)}
                    >
                      Continue where you left off{" "}
                      <ArrowRightCircle className=" h-5 w-5 pl-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div>
                <Link
                  href="/chat"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      className: "flex flex-row gap-2 py-6",
                    }),
                    "flex max-w-[350px] flex-row transition-all ",
                  )}
                >
                  <Avatar className="h-[40px] w-[40px] border border-border">
                    <AvatarImage
                      className={`object-cover transition-all`}
                      src={"https://images.codefoli.com/professorquantum.png"}
                    />
                    <AvatarFallback>{"AI"}</AvatarFallback>
                  </Avatar>
                  Chat with Professor Quantum
                  <MessageSquare className="h-4 w-4" />
                </Link>
              </div>

              <div className="flex max-w-[700px] flex-col gap-2 md:w-[60%]">
                <Streak />
                <LatestAchievements />
              </div> */}
            </div>
          </section>
        </div>
        <section className="py-10">
          <div className="flex flex-col gap-12 rounded-lg border border-border p-8">
            <Suspense fallback={<CourseSkeleton />}>
              <Courses />
            </Suspense>
            <div>
              <h1>Your Files</h1>
              <div className="flex flex-wrap gap-8 py-4">
                <CalculusOverview />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
