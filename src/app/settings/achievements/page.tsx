import { CalendarCheck, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import smartwtfmember from "public/smartwtfmember.png";
import ai from "public/ai.png";
import quiz from "public/quiz.png";
import Image from "next/image";

const Page = () => {
  return (
    <div className=" mx-10 mt-40 flex w-full flex-col">
      <h3 className="mb-2 text-3xl font-bold">Achievements</h3>
      <p className="mb-4 opacity-60 ">View account achievements</p>
      <div className="relative rounded-lg border border-border p-6">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center rounded-lg bg-black/30 dark:bg-black/50">
          <div className="flex flex-col items-center">
            <Lock className="h-4 w-4" />
            <h3>Coming Soon</h3>
          </div>
        </div>
        <h3 className="mb-4 text-center text-2xl font-bold">
          Your achievements
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="w-[250px] rounded-lg border border-border bg-card p-4 shadow-md">
            <h3 className="text-center font-bold">Consistent Scholar</h3>
            <div className="flex items-center justify-center py-4">
              <Image
                width={100}
                height={100}
                src={smartwtfmember}
                alt="smart wtf member"
              />
            </div>
            <p className="mb-2 text-center text-sm opacity-80">
              Logged in and studied for 7 consecutive days.
            </p>
            <div className="space-y-2">
              <p className="flex flex-row items-center justify-center gap-1 text-sm opacity-60">
                <CalendarCheck className="h-4 w-4" /> 07.30.2021
              </p>

              <div className="flex justify-center">
                <Badge variant="common">common</Badge>
              </div>
            </div>
          </div>
          <div className="w-[250px] rounded-lg border border-border bg-card p-4 shadow-md">
            <h3 className="text-center font-bold">Quiz Wiz</h3>
            <div className="flex items-center justify-center py-4">
              <Image width={100} height={100} src={quiz} alt="quiz" />
            </div>
            <p className="mb-2 text-center text-sm opacity-80">
              Earn a 100% on a quiz or test.
            </p>
            <div className="space-y-2">
              <p className="flex flex-row items-center justify-center gap-1 text-sm opacity-60">
                <CalendarCheck className="h-4 w-4" /> 08.15.2021
              </p>
              <div className="flex justify-center">
                <Badge variant="uncommon">uncommon</Badge>
              </div>
            </div>
          </div>
          <div className="w-[250px] rounded-lg border border-border bg-card p-4 shadow-md">
            <h3 className="text-center font-bold">AI something</h3>
            <div className="flex items-center justify-center py-4">
              <Image width={100} height={100} src={ai} alt="ai question" />
            </div>
            <p className="mb-2 text-center text-sm opacity-80">
              Ask the AI a question.
            </p>
            <div className="space-y-2">
              <p className="flex flex-row items-center justify-center gap-1 text-sm opacity-60">
                <CalendarCheck className="h-4 w-4" /> 10.10.2021
              </p>
              <div className="flex justify-center">
                <Badge variant="uncommon">uncommon</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
