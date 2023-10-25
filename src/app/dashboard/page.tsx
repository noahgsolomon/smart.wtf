import { api } from "@/trpc/server";
import Streak from "./components/streak";
import cool from "public/cool.png";
import Image from "next/image";
import LatestAchievements from "./components/latestachievements";
import SystemsDesignCourseCard from "./components/systemsdesigncoursecard";
import WebOptimizationCourseCard from "./components/weboptimizationcoursecard";

const Dashboard = async () => {
  const user = (await api.user.user.query()).user;

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
                <Streak />
                <LatestAchievements />
              </div>
            </div>
          </section>
        </div>
        <section className="py-10">
          <div className="rounded-lg border border-border p-8">
            <h1>Courses</h1>
            <div className="flex flex-wrap gap-8 py-4">
              <SystemsDesignCourseCard />
              <WebOptimizationCourseCard />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
