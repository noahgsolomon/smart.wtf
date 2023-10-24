import { CalendarCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FishIcon from "./icons/fishicon";
import DolphinIcon from "./icons/dolphinicon";
import OctopusIcon from "./icons/octopusicon";
import StarfishIcon from "./icons/starfishicon";

const Page = () => {
  return (
    <div className="mx-10 mt-40 flex w-full flex-col">
      <h3 className="mb-2 text-3xl font-bold">Achievements</h3>
      <p className="mb-4 opacity-60 ">View account achievements</p>
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-center text-2xl font-bold">
          Your achievements
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="shadow-common w-[250px] rounded-lg border border-border p-4 shadow-sm">
            <h3 className="text-center font-bold">Consistent Scholar</h3>
            <div className="flex items-center justify-center py-4">
              <FishIcon />
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
          <div className="shadow-uncommon w-[250px] rounded-lg border border-border p-4 shadow-sm">
            <h3 className="text-center font-bold">Early Bird</h3>
            <div className="flex items-center justify-center py-4">
              <OctopusIcon />
            </div>
            <p className="mb-2 text-center text-sm opacity-80">
              Completed a lesson or activity before 9 AM, 10 times.
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
          <div className="shadow-rare w-[250px] rounded-lg border border-border p-4 shadow-sm">
            <h3 className="text-center font-bold">Quiz Whiz</h3>
            <div className="flex items-center justify-center py-4">
              <DolphinIcon />
            </div>
            <p className="mb-2 text-center text-sm opacity-80">
              Scored above 90% on 5 quizzes or tests.
            </p>
            <div className="space-y-2">
              <p className="flex flex-row items-center justify-center gap-1 text-sm opacity-60">
                <CalendarCheck className="h-4 w-4" /> 09.01.2021
              </p>
              <div className="flex justify-center">
                <Badge variant="rare">rare</Badge>
              </div>
            </div>
          </div>
          <div className="shadow-rare w-[250px] rounded-lg border border-border p-4 shadow-sm">
            <h3 className="text-center font-bold">Systems Design God</h3>
            <div className="flex items-center justify-center py-4">
              <StarfishIcon />
            </div>
            <p className="mb-2 text-center text-sm opacity-80">
              Completed advanced systems design lessons.
            </p>
            <div className="space-y-2">
              <p className="flex flex-row items-center justify-center gap-1 text-sm opacity-60">
                <CalendarCheck className="h-4 w-4" /> 10.10.2021
              </p>
              <div className="flex justify-center">
                <Badge variant="rare">rare</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
