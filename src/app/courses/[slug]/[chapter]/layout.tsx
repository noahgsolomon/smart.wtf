import SidebarCurrentSection from "./components/sidebarcurrentsection";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-32 flex justify-center gap-4 pl-8 md:flex-row lg:pl-0">
      {/* <div className="left-4 top-32 hidden w-[25%] pl-8 lg:fixed lg:block">
        <SidebarCurrentSection params={params} />
      </div> */}
      {children}
    </div>
  );
}
