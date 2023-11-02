"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import blazing from "public/blazing.png";
import ThemeButton from "./theme";
import ChatButton from "./chatbutton";
import { usePathname } from "next/navigation";

export default function LessonHeading() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex w-screen flex-row items-center justify-between border border-b-border  bg-background py-2 shadow-sm md:px-10">
      <Link href={"/courses/"} className={buttonVariants({ variant: "ghost" })}>
        <X className="h-4 w-4" />
      </Link>
      <Progress
        indicatorClassName="rounded-r-lg "
        value={20}
        className="h-3 w-[300px] max-w-[40%] border border-border"
      />
      <div className="flex flex-row items-center gap-2">
        <ThemeButton className="hidden md:block" />
        <ChatButton query={`prev=${pathname}`} lesson={true} />
        <div className="cursor-pointer transition-all hover:scale-105">
          <Image
            className="m-1"
            width={30}
            height={30}
            src={blazing}
            alt="streak"
          />
        </div>
      </div>
    </div>
  );
}
