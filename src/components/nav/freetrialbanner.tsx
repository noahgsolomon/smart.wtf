import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

const FreeTrialBanner = ({
  className,
  daysLeft,
  progress,
}: {
  className?: string;
  daysLeft: number;
  progress: number;
}) => {
  console.log(progress);
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center gap-4 pt-1",
        className,
      )}
    >
      <p className="text-sm">{daysLeft} days left</p>
      <Progress
        indicatorClassName={""}
        className={"w-[20%]"}
        value={progress * 100}
      />
      <Link href="pricing" className={buttonVariants({ size: "sm" })}>
        Join now
      </Link>
    </div>
  );
};

export default FreeTrialBanner;
