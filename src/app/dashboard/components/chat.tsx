"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useChat } from "ai/react";
import { cn } from "@/lib/utils";

const Chat = ({ className, page }: { className?: string; page?: boolean }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div
      className={cn(
        "max-w-[400px] rounded-lg border border-border bg-card p-4 shadow-md",
        className,
      )}
    >
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
        <div
          className={`flex h-[300px] flex-col gap-2 overflow-y-auto py-4 ${
            page ? "sm:h-[400px] md:h-[500px]" : ""
          }`}
        >
          <div className="flex justify-start ">
            <p className="max-w-[60%] overflow-hidden rounded-lg border border-border bg-popover px-2 py-1 text-sm ">
              Pose a question, drop a link, or upload a PDF. I&apos;ll either
              answer or craft a lesson from it. Ready for a knowledge quest?
            </p>
          </div>
          {messages.map((m) => (
            <div key={m.id}>
              {m.role === "user" ? (
                <div className="flex justify-end ">
                  <p className="max-w-[60%] overflow-hidden rounded-lg border border-border bg-primary px-2 py-1 text-sm text-secondary ">
                    {m.content}
                  </p>
                </div>
              ) : (
                <div className="flex justify-start ">
                  <p className="max-w-[60%] overflow-hidden rounded-lg border border-border bg-popover px-2 py-1 text-sm ">
                    {m.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-2 border-t border-border py-4"
        >
          <Button variant={"outline"} className="rounded-full p-3">
            +
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="enter message here..."
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
