import { api } from "@/trpc/server";
import LatestActivity from "./components/latestactivity";
import Streak from "./components/streak";
import NotesMenu from "../notes/components/notesmenu";
import Dashboard from "./components/dashboard";

const Page = async () => {
  const user = (await api.user.user.query()).user;

  return (
    <>
      <main className="mx-5 mt-20 transition-all lg:mx-24 2xl:mx-80">
        <section className="py-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row items-center gap-2">
              <h3 className="text-4xl">
                Welcome back,{" "}
                {`${
                  (user?.name.split(" ")[0]?.charAt(0).toUpperCase() ?? "") +
                  (user?.name.split(" ")[0]?.slice(1) ?? "")
                }`}
              </h3>
            </div>
            <Dashboard />
          </div>
        </section>
        {/* <section className="py-10">
          <div className="flex flex-col gap-12">
            <Suspense fallback={<CourseSkeleton />}>
              <Courses />
            </Suspense>
          </div>
        </section> */}
      </main>
    </>
  );
};

export default Page;
