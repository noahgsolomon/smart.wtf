"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useChatContext } from "@/app/context/chat/ChatContext";
import { trpc } from "@/trpc/client";
import Markdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const Chat = ({ className }: { className?: string }) => {
  const [isVisible, setIsVisible] = useState(true);

  const [input, setInput] = useState("");

  const { setOpen } = useChatContext();

  const {
    messages,
    setMessages,
    loading,
    setLoading,
    assistantId,
    threadId,
    lesson,
    setThreadId,
  } = useChatContext();

  const variants = {
    hidden: { opacity: 0, x: 10, y: 10 },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setOpen(false), 300);
  };

  const newThreadMutation = trpc.ai.newThread.useMutation({
    onSuccess: ({ threadId }) => {
      setThreadId(threadId);
      setMessages([]);
      fetchMessagesForNewThread(threadId);
    },
  });

  const fetchMessagesForNewThread = (newThreadId: string) => {
    const newMessageQuery = trpc.ai.getMessages.useQuery({
      assistantId,
      threadId: newThreadId,
    });
    setMessages(newMessageQuery.data?.messages ?? []);
  };

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleNewThread = () => {
    newThreadMutation.mutate();
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const [dots, setDots] = useState(".");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((dots) => {
          if (dots === ".") {
            return "..";
          } else if (dots === "...") {
            return ".";
          } else {
            return "...";
          }
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const sendMessageMutation = trpc.ai.sendMessage.useMutation();

  const handleSubmit = () => {
    setInput("");
    if (messages?.length > 0) {
      setMessages((messages) => [...messages, { text: input, role: "user" }]);
    } else {
      setMessages([{ text: input, role: "user" }]);
    }
    setLoading(true);
    sendMessageMutation.mutate(
      { assistantId, threadId, text: input, lesson },
      {
        onSuccess: (data) => {
          console.log("success");
          setLoading(false);
          setMessages((messages) => [...messages, ...data.messages]);
        },
        onError: (error) => {
          console.log(error);
          setLoading(false);
        },
      },
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "exit"}
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "max-w-[400px] rounded-lg border border-border bg-card p-4 md:max-w-[500px]",
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
          <div className="flex flex-row gap-1">
            {messages?.length > 0 && (
              <Button
                variant={"ghost"}
                className="rounded-full"
                onClick={handleNewThread}
                disabled={loading}
              >
                Clear
              </Button>
            )}
            <button
              onClick={handleClose}
              className="rounded-full border border-border bg-secondary p-2 transition-all hover:opacity-80"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className={`flex h-[300px] flex-col gap-2 overflow-y-auto py-4 md:h-[500px]`}
        >
          <div className="flex justify-start ">
            <p className="max-w-[60%] overflow-hidden rounded-lg border border-border bg-secondary px-2 py-1 text-sm ">
              Pose a question or topic of interest. I'll either answer or craft
              a lesson from it. Ready for a knowledge quest?
            </p>
          </div>
          {messages?.map((m, index) => (
            <div key={index}>
              {m.role === "user" ? (
                <div className="flex justify-end ">
                  <p className="max-w-[60%] overflow-hidden rounded-lg border border-border bg-primary px-2 py-1 text-sm text-secondary ">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div className="flex justify-start ">
                  <div className="max-w-[75%] overflow-hidden rounded-lg border border-border bg-secondary px-2 py-1 text-sm ">
                    <Markdown
                      components={{
                        code: ({ className, children, ...props }) => {
                          const match = /language-(\w+)/.exec(className ?? "");
                          return match ? (
                            <div>
                              <p className="code-language">{match[1]}</p>
                              <pre className={className}>
                                <code>{children}</code>
                              </pre>
                            </div>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                        img: ({ ...props }) => (
                          <Image
                            className="rounded-lg"
                            src={props.src ?? ""}
                            alt={props.alt ?? "smartwtf"}
                            priority={true}
                            layout="responsive"
                            width={1792 / 4}
                            height={1024 / 4}
                          />
                        ),
                      }}
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {m.text}
                    </Markdown>
                  </div>
                </div>
              )}
              {index + 1 === messages.length && loading && (
                <div className="flex justify-start">
                  <p className="text-xl font-bold opacity-60">{dots}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-2 border-t border-border py-4">
          <div className="relative w-full">
            <Input
              className="focus:ring-lighBlue rounded-full pl-3 pr-10 shadow-none transition-all focus:outline-none focus:ring-1" // Adjust padding to make space for the button
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              onChange={(e) => setInput(e.target.value)}
              placeholder="enter message here..."
            />
            <Button
              disabled={input.length === 0}
              type="button"
              onClick={handleSubmit}
              className={`${
                input.length > 0 ? "bg-blue hover:bg-blue hover:opacity-80" : ""
              } absolute inset-y-1 right-1 flex h-auto min-h-0 items-center justify-center rounded-full p-2`} // Adjust vertical positioning and button height
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;
