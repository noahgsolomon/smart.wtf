import { api } from "@/trpc/server";

const Dashboard = async () => {
  const user = (await api.user.user.query()).user;

  return (
    <>
      <main className="mx-20 mt-48 h-[calc(100vh-20rem)]">
        <div className="">
          <div>
            <h3 className="text-4xl">Welcome back, {user?.name}</h3>
          </div>
          {/* <div>
            <div className="h-[300px] w-[500px] rounded-lg border border-border shadow-lg shadow-secondary transition-all lg:w-[600px]">
              <div>built by buildstreak</div>
            </div>
          </div> */}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
