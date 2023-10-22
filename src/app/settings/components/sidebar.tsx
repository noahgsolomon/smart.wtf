import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Fish, Landmark, Settings } from "lucide-react";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="ml-10 mt-32 hidden flex-col items-center justify-start md:flex">
      <Link
        href="/settings/achievements"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "pr-30 mx-1 my-1 flex w-full flex-row justify-start gap-2 rounded-lg pl-4 transition-all hover:bg-secondary focus:bg-secondary",
        )}
      >
        <Fish className="h-4 w-4" />
        Achievements
      </Link>
      <Link
        href="/settings/billing"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "pr-30 mx-1 my-1 flex w-full flex-row justify-start gap-2 rounded-lg pl-4 transition-all hover:bg-secondary focus:bg-secondary",
        )}
      >
        <Landmark className="h-4 w-4" />
        Billing
      </Link>
      <Link
        href="/settings"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "pr-30 mx-1 my-1 flex w-full flex-row justify-start gap-2 rounded-lg pl-4 transition-all hover:bg-secondary focus:bg-secondary",
        )}
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </div>
  );
};

export default SideBar;
