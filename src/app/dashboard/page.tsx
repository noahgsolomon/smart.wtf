import { api } from "@/trpc/server";

const Dashboard = async () => {
  const user = await api.user.user.query();

  return (
    <>
      <main className="mt-20">
        <div className="flex items-center justify-center">
          <div className="rounded-lg border-border"></div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
