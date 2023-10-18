import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import UserDashboard from "@/components/userdashboard";
import { api } from "@/trpc/server";

const Dashboard = async () => {
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <>
      <main>
        <div className="mt-20 flex justify-center">
          <Suspense fallback={<Loader2 className="h-4 w-4 animate-spin" />}>
            <UserDashboard />
          </Suspense>
          <div>{hello.greeting}</div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
