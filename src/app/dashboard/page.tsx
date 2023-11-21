import { api } from "@/trpc/server";
import CalculusOverview from "./components/calculusoverview";
import Courses from "./components/courses/courses";
import { Suspense } from "react";
import { CourseSkeleton } from "./components/courses/courseskeleton";
import LatestActivity from "./components/latestactivity";
import Streak from "./components/streak";
import Sort from "../lesson/components/interactive/sort/sort";

const Dashboard = async () => {
  const user = (await api.user.user.query()).user;

  return (
    <>
      <main className="mx-5 mt-20 md:mx-20 lg:mx-36">
        <section className="py-10">
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-row items-center gap-2">
              <h3 className="text-4xl">
                Welcome back,{" "}
                {`${
                  (user?.name.split(" ")[0]?.charAt(0).toUpperCase() ?? "") +
                  (user?.name.split(" ")[0]?.slice(1) ?? "")
                }`}
              </h3>
            </div>
            <LatestActivity />

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
              </div> */}

            <div className="flex max-w-[700px] flex-col gap-2 md:w-[60%]">
              <Streak />
            </div>
          </div>
        </section>
        <section className="py-10">
          <div className="flex flex-col gap-12">
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
