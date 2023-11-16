import Image from "next/image";
import smartwtfmember from "public/smartwtfmember.png";
import quiz from "public/quiz.png";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ai from "public/ai.png";

const LatestAchievements = () => {
  return (
    <div>
      <h3>Latest Achievements</h3>
      <div className="flex">
        <TooltipProvider>
          <div className="relative flex flex-row gap-4 rounded-lg border border-border bg-card p-2">
            <Tooltip>
              <TooltipTrigger>
                <div className="flex cursor-pointer items-center overflow-hidden rounded-full border border-border bg-common transition-all hover:scale-105">
                  <Image
                    width={50}
                    height={50}
                    src={smartwtfmember}
                    alt="member"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>register for smart.wtf</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <div className="cursor-pointer overflow-hidden rounded-full border border-border bg-uncommon transition-all hover:scale-105">
                  <Image width={50} height={50} src={quiz} alt="100% on quiz" />
                </div>
              </TooltipTrigger>
              <TooltipContent>earn a 100% on quiz</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <div className="cursor-pointer overflow-hidden rounded-full border border-border bg-uncommon transition-all hover:scale-105">
                  <Image width={50} height={50} src={ai} alt="prompt ai" />
                </div>
              </TooltipTrigger>
              <TooltipContent>ask the ai a question</TooltipContent>
            </Tooltip>

            <Link
              href="/settings/achievements"
              className={buttonVariants({
                variant: "link",
                className: "flex h-full flex-row items-center gap-2",
              })}
            >
              view all
            </Link>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default LatestAchievements;
