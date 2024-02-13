import { api } from "@/trpc/server";
import DashboardNew from "./dashboardnew";

const Page = async () => {
  const user = (await api.user.user.query()).user;

  return (
    <>
      <main className="2xl:mx-58 mx-[7%] mt-16 flex h-[60vh] items-center justify-center transition-all lg:mx-32 xl:mx-48">
        <DashboardNew />
      </main>
    </>
  );
};

export default Page;
