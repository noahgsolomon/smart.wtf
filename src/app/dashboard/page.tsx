import { api } from "@/trpc/server";
import Dashboard from "./components/dashboard";

const Page = async () => {
  const user = (await api.user.user.query()).user;

  return (
    <>
      <main className="2xl:mx-58 mx-[7%] mt-16 transition-all lg:mx-32 xl:mx-48">
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
      </main>
    </>
  );
};

export default Page;
