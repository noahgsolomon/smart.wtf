"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Send, X } from "lucide-react";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";

const Chat = ({
  setOpen,
  className,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
}) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isVisible, setIsVisible] = useState(true);

  const variants = {
    hidden: { opacity: 0, x: 50, y: 50 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setOpen(false), 300);
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "exit"}
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "max-w-[400px] rounded-lg border border-border bg-card p-4",
        className,
      )}
    >
      <div className="flex flex-col">
        <div className=" flex flex-row items-center justify-between border-b border-border pb-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar className="h-[60px] w-[60px] cursor-pointer border border-border transition-all marker:border hover:scale-105">
              <AvatarImage
                className={`object-cover transition-all`}
                src={"https://images.codefoli.com/professorquantum.png"}
              />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <p>Professor Quantum</p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-full border border-border bg-secondary p-2 transition-all hover:opacity-80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className={`flex h-[300px] flex-col gap-2 overflow-y-auto py-4`}>
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
          <div className="relative w-full">
            <Input
              className="focus:ring-lighBlue rounded-full pl-3 pr-10 shadow-none transition-all focus:outline-none focus:ring-1" // Adjust padding to make space for the button
              value={input}
              onChange={handleInputChange}
              placeholder="enter message here..."
            />
            <Button
              disabled={input.length === 0}
              type="submit"
              className={`${
                input.length > 0 ? "bg-blue hover:bg-blue hover:opacity-80" : ""
              } absolute inset-y-1 right-1 flex h-auto min-h-0 items-center justify-center rounded-full p-2`} // Adjust vertical positioning and button height
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Chat;
