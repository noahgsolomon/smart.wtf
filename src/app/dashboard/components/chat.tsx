import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const Chat = () => {
  return (
    <div className="max-w-[400px] rounded-lg border border-border bg-card p-4 shadow-md">
      <div className="flex flex-col">
        <div className=" flex flex-row items-center gap-2 border-b border-border pb-4">
          <Avatar className="h-[60px] w-[60px] cursor-pointer border border-border transition-all marker:border hover:scale-105">
            <AvatarImage
              className={`object-cover transition-all`}
              src={"https://images.codefoli.com/professorquantum.png"}
            />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <p>Professor Quantum</p>
        </div>
        <div className="flex h-[300px] flex-col gap-2 overflow-y-auto py-4">
          <div className="flex justify-start ">
            <p className="max-w-[60%] overflow-hidden rounded-lg border border-border bg-popover px-2 py-1 text-sm ">
              Pose a question, drop a link, or upload a PDF. I&apos;ll either
              answer or craft a lesson from it. Ready for a knowledge quest?
            </p>
          </div>
          {/* <div className="flex justify-end ">
            <p className="max-w-[60%] overflow-hidden rounded-lg border border-border bg-primary px-2 py-1 text-sm text-secondary ">
              go fuck yourselfdedegofuckyourselfyourselfdedegofuckyourself
              yourselfdedegofuckyourself dedego fuck yourself dede
            </p>
          </div> */}
        </div>
        <div className="flex flex-row gap-2 border-t border-border py-4">
          <Button variant={"outline"} className="rounded-full p-3">
            +
          </Button>
          <Input placeholder="enter message here..." />
          <Button>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
