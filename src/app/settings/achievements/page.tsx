import { CalendarCheck, Lock, LockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import smartwtfmember from "public/smartwtfmember.png";
import ai from "public/ai.png";
import quiz from "public/quiz.png";
import Image from "next/image";
import goldfish from "public/goldfish.png";

const Page = () => {
  return (
    <div className=" mx-10 mt-40 flex w-full flex-col">
      <h3 className="mb-2 text-3xl font-bold">Achievements</h3>
      <p className="mb-4 opacity-60 ">View account achievements</p>
      <div className="relative flex flex-col items-center justify-center rounded-lg border border-border bg-card p-4">
        <Image width={200} height={200} src={goldfish} alt="goldfish" />
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center rounded-lg bg-black/30 ">
          <div className="flex flex-col items-center text-secondary dark:text-primary">
            <Lock className="h-5 w-5" />
            <h3>Coming Soon</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
