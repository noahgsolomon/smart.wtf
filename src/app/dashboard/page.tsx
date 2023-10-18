import UserDashboard from "@/components/userdashboard";
import { api } from "@/trpc/server";

const Dashboard = async () => {
  const user = await api.user.user.query();
  const usersJunk = await api.user.other.mutate({
    junk: "random junk in here",
  });

  return (
    <>
      <main className="mt-20">
        <div className="flex justify-center">
          <UserDashboard />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
