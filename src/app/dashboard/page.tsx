import { api } from "@/trpc/server";
import CourseCard from "./components/coursecard";
import Streak from "./components/streak";
import fire from "public/fire.png";
import Image from "next/image";

const Dashboard = async () => {
  const user = (await api.user.user.query()).user;

  return (
    <>
      <main className="mx-5 mt-32 md:mx-20">
        <div>
          <section className="py-10">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <h3 className="text-4xl">Welcome back, {user?.name}</h3>
              </div>
              <div>
                <div className="flex flex-row pb-4">
                  <div className="flex items-end gap-2">
                    <Image
                      className="object-contain"
                      width={40}
                      height={40}
                      src={fire}
                      alt={"fire"}
                    />
                  </div>
                  <div className="pb-5">
                    <div className="rounded-lg border border-border bg-secondary px-2 py-1">
                      <p className="">You&apos;re on a hot streak!</p>
                    </div>
                  </div>
                </div>
                <Streak />
              </div>
            </div>
          </section>
        </div>
        <section className="py-10">
          <div className="rounded-lg border border-border p-8">
            <h1>Courses</h1>
            <div className="flex flex-wrap py-4 ">
              <CourseCard />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
