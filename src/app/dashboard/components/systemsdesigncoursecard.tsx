import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import systemsDesign from "public/systemsdesign.png";
import { Progress } from "@/components/ui/progress";

const SystemsDesignCourseCard = () => {
  return (
    <div className="relative">
      <Badge className="absolute -left-1 -top-2 z-10">new</Badge>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:border-primary hover:shadow-md ">
        <div className="overflow-hidden border-b border-border">
          <div className="transition-all group-hover:scale-[105%]">
            <Image
              src={systemsDesign}
              width={300}
              height={300}
              className="rounded-t-lg"
              alt="systems design group-hover:bg-black"
            />
          </div>
        </div>

        <div className="flex min-h-[200px] flex-col justify-between gap-2 p-4">
          <h2 className="text-xl">Systems Design</h2>
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
            <h3 className="text-xs opacity-60">10%</h3>
            <Progress value={10} />
          </div>
          <div>
            <Badge variant={"destructive"}>hard</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemsDesignCourseCard;
