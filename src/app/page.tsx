import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import DashboardNew from "./dashboard/dashboardnew";
import FlyingRecommendations from "./dashboard/flyingrecommendations";

export default function Home() {
  const user = auth();

  if (user?.userId) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className="mx-4 flex h-[60vh] flex-col items-center justify-center pt-24 transition-all md:mx-20 xl:mx-80">
        <div className="flex flex-col items-center justify-center gap-8 pb-8">
          <div className=" flex flex-col items-center gap-2">
            <Badge className="text-lg md:hidden" variant={"math"}>
              BETA
            </Badge>
            <h1 className="relative max-w-[10ch] text-center text-5xl font-bold text-primary lg:text-6xl">
              SMART.WTF
              <Badge
                className="absolute -top-8 hidden text-lg md:-right-12 md:block"
                variant={"math"}
              >
                BETA
              </Badge>
            </h1>
          </div>
        </div>
        <DashboardNew />
      </main>
      <FlyingRecommendations />
    </>
  );
}
