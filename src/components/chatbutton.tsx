"use client";

import { ArrowUp, Bot, X } from "lucide-react";
import { useChatContext } from "@/app/context/chat/ChatContext";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Markdown from "react-markdown";
import Image from "next/image";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default function ChatButton() {
  const [input, setInput] = useState("");

  const {
    messages,
    setMessages,
    open,
    setOpen,
    generating,
    handleGenerate,
    chatPrompt,
    setChatPrompt,
    chatResponse,
  } = useChatContext();

  const handleClose = () => {
    setTimeout(() => setOpen(false), 300);
  };
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        content: `Try to challenge me with a question or topic. I'll either grace
                you with a response that showcases my superior intellect. Let's
                see if you can keep up, shall we?`,
        role: "assistant",
      },
    ]);
  }, []);

  const handleSubmit = () => {
    if (messages?.length > 0) {
      setMessages((messages) => [
        ...messages,
        { content: chatPrompt, role: "user" },
      ]);
    } else {
      setMessages([{ content: chatPrompt, role: "user" }]);
    }
    setInput("");
    handleGenerate(chatPrompt);
  };

  return (
    <div className="fixed bottom-4 right-4 z-30 ">
      <Drawer open={open}>
        <DrawerTrigger>
          <div>
            <button onClick={() => setOpen(true)}>
              <div className="overflow-hidden rounded-full border border-border bg-card shadow-sm transition-all hover:scale-[102%] hover:opacity-80 active:scale-[98%]">
                <div className="p-4">
                  <Bot className="h-7 w-7" />
                </div>
              </div>
            </button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <>
            <div
              className={cn(
                "max-w-[300px] rounded-lg border border-border bg-card p-4 sm:max-w-[400px] md:max-w-[500px]",
              )}
            >
              <div className="flex flex-col">
                <div className=" flex flex-row items-center justify-between border-b border-border pb-4">
                  <div className="flex flex-row items-center gap-4 md:gap-6">
                    <Avatar className="h-[60px] w-[60px] cursor-pointer border border-border transition-all marker:border hover:scale-105 md:h-[80px] md:w-[80px]">
                      <AvatarImage
                        className={`object-cover transition-all`}
                        src={"/botwtf2.png"}
                      />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <p className="text-xl font-bold">Bot.wtf</p>
                  </div>
                  <div className="flex flex-row gap-1">
                    {messages?.length > 0 && (
                      <Button
                        variant={"ghost"}
                        className="rounded-full"
                        onClick={() =>
                          setMessages([
                            {
                              content: `Try to challenge me with a question or topic. I'll either grace
                you with a response that showcases my superior intellect. Let's
                see if you can keep up, shall we?`,
                              role: "assistant",
                            },
                          ])
                        }
                        disabled={generating || messages.length < 2}
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
                  {messages?.map((m, index) => (
                    <div key={index}>
                      {m.role === "user" ? (
                        <div className="flex justify-end ">
                          <p className="max-w-[60%] overflow-hidden rounded-lg border border-border bg-primary px-2 py-1 text-sm text-secondary ">
                            {m.content}
                          </p>
                        </div>
                      ) : (
                        <div className="flex justify-start ">
                          <div className="max-w-[75%] overflow-hidden rounded-lg border border-border bg-secondary px-2 py-1 text-sm ">
                            <Markdown
                              components={{
                                code: ({ className, children, ...props }) => {
                                  const match = /language-(\w+)/.exec(
                                    className ?? "",
                                  );
                                  return match ? (
                                    <div>
                                      <p className="code-language">
                                        {match[1]}
                                      </p>
                                      <pre className={cn(className)}>
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
                              remarkPlugins={[remarkGfm, remarkMath]}
                              rehypePlugins={[
                                rehypeKatex,
                                slug,
                                [
                                  rehypeAutolinkHeadings,
                                  {
                                    behavior: "wrap",
                                  },
                                ],
                                rehypeHighlight,
                              ]}
                            >
                              {m.content}
                            </Markdown>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {generating && (
                    <div className="flex justify-start ">
                      <p className="max-w-[75%] overflow-hidden rounded-lg border border-border bg-secondary px-2 py-1 text-sm ">
                        <Markdown
                          components={{
                            code: ({ className, children, ...props }) => {
                              const match = /language-(\w+)/.exec(
                                className ?? "",
                              );
                              return match ? (
                                <div>
                                  <p className="code-language">{match[1]}</p>
                                  <pre className={cn(className)}>
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
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[
                            rehypeKatex,
                            slug,
                            [
                              rehypeAutolinkHeadings,
                              {
                                behavior: "wrap",
                              },
                            ],
                            rehypeHighlight,
                          ]}
                        >
                          {chatResponse}
                        </Markdown>
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-row gap-2 border-t border-border py-4">
                  <div className="relative w-full">
                    <Input
                      className="focus:ring-lighBlue rounded-full pl-3 pr-10 shadow-none transition-all focus:outline-none focus:ring-1" // Adjust padding to make space for the button
                      value={input}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          input.length > 0 &&
                          !generating
                        ) {
                          handleSubmit();
                        }
                      }}
                      onChange={(e) => {
                        setInput(e.target.value);
                        setChatPrompt(e.target.value);
                      }}
                      placeholder="enter message here..."
                    />
                    <Button
                      disabled={input.length === 0 || generating}
                      type="button"
                      onClick={handleSubmit}
                      className={`${
                        input.length > 0
                          ? "bg-blue hover:bg-blue hover:opacity-80"
                          : ""
                      } absolute inset-y-1 right-1 flex h-auto min-h-0 items-center justify-center rounded-full p-2`} // Adjust vertical positioning and button height
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
