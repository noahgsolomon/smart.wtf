"use client";

import { Bot, Copy, CornerDownLeft, RotateCw } from "lucide-react";
import { useChatContext } from "@/app/context/chat/ChatContext";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Markdown from "react-markdown";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { ChatItem, MetaData } from "@lobehub/ui";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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

  const avatar: MetaData = {
    avatar: "🤖",
    backgroundColor: "#64B5F6",
    title: "Bot.wtf",
  };

  const userAvatar: MetaData = {
    avatar: "😎",
    backgroundColor: "#FFD54F",
    title: "Noah Solomon",
  };

  return (
    <div className="fixed bottom-4 right-4 z-30 ">
      <Drawer onOpenChange={setOpen} open={open}>
        <DrawerTrigger>
          <div onClick={() => setOpen(true)}>
            <div className="overflow-hidden rounded-full border border-border bg-card shadow-sm transition-all hover:scale-[102%] hover:opacity-80 active:scale-[98%]">
              <div className="p-4">
                <Bot className="h-7 w-7" />
              </div>
            </div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="mx-auto flex max-w-[1000px] justify-center rounded-t-lg border bg-card">
          <div className="p-4 pb-0">
            <div
              ref={chatContainerRef}
              className={`flex max-h-[600px] min-h-[400px] flex-col overflow-y-auto md:p-4`}
            >
              {messages?.map((m, index) => (
                <div key={index}>
                  {m.role === "user" ? (
                    <ChatItem
                      placement="right"
                      actions={
                        <Tooltip>
                          <div className="flex flex-row rounded-lg border bg-secondary/50 p-1">
                            <Tooltip>
                              <TooltipTrigger>
                                <Button variant={"ghost"} size={"sm"}>
                                  <Copy className="h-4 w-4 text-primary/60" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Copy</TooltipContent>
                            </Tooltip>
                          </div>
                        </Tooltip>
                      }
                      type="block"
                      renderMessage={() => {
                        return (
                          <div className="rounded-lg border bg-blue px-2 py-1 text-secondary dark:text-primary">
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
                        );
                      }}
                      avatar={userAvatar}
                      showTitle
                    />
                  ) : (
                    <ChatItem
                      placement="left"
                      actions={
                        <Tooltip>
                          <div className="flex flex-row rounded-lg border bg-secondary/50 p-1">
                            <Tooltip>
                              <TooltipTrigger>
                                <Button variant={"ghost"} size={"sm"}>
                                  <Copy className="h-4 w-4 text-primary/60" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Copy</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger>
                                <Button variant={"ghost"} size={"sm"}>
                                  <RotateCw className="h-4 w-4 text-primary/60" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Regenerate</TooltipContent>
                            </Tooltip>
                          </div>
                        </Tooltip>
                      }
                      type="block"
                      renderMessage={() => {
                        return (
                          <div className="cum rounded-lg border bg-secondary px-2 py-1 text-primary">
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
                        );
                      }}
                      avatar={avatar}
                      showTitle
                    />
                  )}
                </div>
              ))}
              {generating && (
                <ChatItem
                  placement="left"
                  actions={
                    <Tooltip>
                      <div className="flex flex-row rounded-lg border bg-secondary/50 p-1">
                        <Tooltip>
                          <TooltipTrigger>
                            <Button variant={"ghost"} size={"sm"}>
                              <Copy className="h-4 w-4 text-primary/60" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Copy</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger>
                            <Button variant={"ghost"} size={"sm"}>
                              <RotateCw className="h-4 w-4 text-primary/60" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Regenerate</TooltipContent>
                        </Tooltip>
                      </div>
                    </Tooltip>
                  }
                  type="block"
                  renderMessage={() => {
                    return (
                      <div className="cum rounded-lg border bg-secondary px-2 py-1 text-primary">
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
                      </div>
                    );
                  }}
                  avatar={avatar}
                  showTitle
                  loading
                />
              )}
            </div>
          </div>
          <div className="border-t">
            <Textarea
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (input.length === 0) return;
                  if (!e.metaKey) {
                    e.preventDefault();
                    handleSubmit();
                  } else {
                    const target = e.target as HTMLTextAreaElement;
                    setInput(
                      input.slice(0, target.selectionStart) +
                        "\n" +
                        input.slice(target.selectionEnd),
                    );
                    target.selectionStart = target.selectionEnd =
                      target.selectionStart + 1;
                  }
                }
              }}
              onChange={(e) => {
                setInput(e.target.value);
                setChatPrompt(e.target.value);
              }}
              placeholder="Type your message here..."
              className="h-[100px] resize-none rounded-none border-none bg-transparent p-4 shadow-none"
            />
            <div className="m-4 flex flex-row items-center justify-end gap-4">
              <div className="flex flex-row items-center gap-1 text-xs text-primary/60">
                <CornerDownLeft className="h-3 w-3" />
                Send / ⌘<CornerDownLeft className="h-3 w-3" /> New Line
              </div>
              <Button disabled={input.length === 0} onClick={handleSubmit}>
                Send
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

{
  /* <div
  className={cn(
    "max-w-[300px] rounded-lg border border-border bg-card p-4 sm:max-w-[400px] md:max-w-[500px]",
  )}
>
  <div className="flex flex-col">
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
      onClick={() => setOpen(false)}
      className="rounded-full border border-border bg-secondary p-2 transition-all hover:opacity-80"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
</div>; */
}
