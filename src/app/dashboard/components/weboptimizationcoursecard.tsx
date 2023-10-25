import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import hamsterWizard from "public/hamsterwizard.png";
import { Progress } from "@/components/ui/progress";

const WebOptimizationCourseCard = () => {
  return (
    <div className="relative">
      <Badge className="absolute -left-1 -top-2 z-10">new</Badge>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:border-primary hover:shadow-md ">
        <div className="overflow-hidden border-b border-border">
          <div className="relative cursor-pointer">
            <Image
              src={hamsterWizard}
              width={300}
              height={300}
              className="rounded-t-lg transition-all group-hover:scale-105"
              alt="systems design"
            />
          </div>
        </div>

        <div className="flex h-[200px] flex-col justify-between gap-2 p-4">
          <h2 className="max-w-[20ch] text-xl">
            Web Performance and Optimization
          </h2>
          <div className="flex flex-row items-center gap-2">
            <div>
              <Avatar className="h-[30px] w-[30px] border border-border">
                <AvatarImage
                  className={`object-cover transition-all`}
                  src={"https://images.codefoli.com/ricknmort.png"}
                />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="text-sm font-bold">Instructor</h3>
              <h3 className="text-xs">Noah Solomon</h3>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <h3 className="text-xs opacity-60">30%</h3>
            <Progress value={30} />
          </div>
          <div>
            <Badge variant={"easy"}>beginner</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebOptimizationCourseCard;
