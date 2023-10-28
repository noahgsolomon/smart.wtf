import { api } from "@/trpc/server";
import Streak from "./components/streak";
import cool from "public/cool.png";
import Image from "next/image";
import LatestAchievements from "./components/latestachievements";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import CalculusOverview from "./components/calculusoverview";
import Courses from "./components/courses/courses";

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
              <div>
                <Link
                  href="/chat"
                  className={buttonVariants({
                    variant: "outline",
                    className: "flex flex-row gap-2 py-6",
                  })}
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
              </div>
            </div>
          </section>
        </div>
        <section className="py-10">
          <div className="flex flex-col gap-12 rounded-lg border border-border p-8">
            <Courses />
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
