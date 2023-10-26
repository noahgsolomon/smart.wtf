import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import robotchicken from "public/robotchicken.png";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Circle, Heart } from "lucide-react";
import wtfcoin from "public/wtfcoin.png";

const WebOptimizationCourseCard = () => {
  return (
    <div className="relative">
      <Badge className="absolute -left-2 -top-2 z-10 rounded-lg">new</Badge>
      <Button className="absolute right-3 top-3 z-10" variant={"secondary"}>
        <Heart className="h-4 w-4 text-pink-500 dark:text-pink-700" />
      </Button>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:border-primary hover:shadow-md ">
        <div className="relative overflow-hidden border-b border-border">
          <div className="transition-all group-hover:scale-[105%]">
            <Image
              src={robotchicken}
              width={300}
              height={300}
              className="rounded-t-lg"
              alt="systems design group-hover:bg-black"
            />
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge variant={"medium"}>Medium</Badge>
          </div>
        </div>

        <div className="flex min-h-[200px] flex-col justify-between gap-2 p-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl">Web Optimization</h2>
            <div className="flex flex-row items-center gap-1 rounded-lg bg-secondary p-1 text-xs font-bold text-opacity-60">
              <Circle className="fill-blue h-3 w-3 text-secondary" />
              STARTED
            </div>
          </div>
          <div className="max-w-[35ch] text-xs opacity-60">
            Master techniques and tools to optimize web speed, enhance UX, and
            manage resources effectively.
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm">Progress</h3>
            <div className="flex flex-row items-center gap-2">
              <h3 className="text-xs opacity-60">30%</h3>
              <Progress
                className=" bg-secondary"
                indicatorClassName="bg-blue rounded-r-lg"
                value={30}
              />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <div>
                <Avatar className="h-[35px] w-[35px] border border-border">
                  <AvatarImage
                    className={`object-cover transition-all`}
                    src={"https://images.codefoli.com/ricknmort.png"}
                  />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h3 className="text-sm">Noah Solomon</h3>
                <h3 className="text-xs">Instructor</h3>
              </div>
            </div>
            <div className="group flex flex-row items-center rounded-lg border border-border bg-background p-1 transition-all hover:scale-105">
              <Image width={30} height={30} src={wtfcoin} alt="wtf coin" />
              <p className="text-sm"> + 300</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebOptimizationCourseCard;
