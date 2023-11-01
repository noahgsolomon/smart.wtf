import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import streak from "public/streak.png";

export default function LessonHeading() {
  return (
    <div className="flex w-screen flex-row items-center justify-between border border-b-border px-10 py-1">
      <Link href={"/courses/"} className={buttonVariants({ variant: "ghost" })}>
        <X className="h-4 w-4" />
      </Link>
      <Progress
        indicatorClassName="rounded-r-lg "
        value={20}
        className="h-3 w-[300px] max-w-[40%] border border-border"
      />

      <Image width={40} height={30} src={streak} alt="streak" />
    </div>
  );
}
