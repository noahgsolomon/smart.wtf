"use client";

import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { type Note } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Clock, Copy, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import slug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

export default function Page({ params }: { params: { noteId: string } }) {
  const retrieveNoteQuery = trpc.notes.getNote.useQuery({
    id: parseInt(params.noteId),
  });

  const [note, setNote] = useState<Note | null>(null);

  const [agentMarkdown, setAgentMarkdown] = useState("");

  useEffect(() => {
    const note = retrieveNoteQuery.data?.note;
    if (note) {
      setNote(note);
      if (note.agents_markdown && agentMarkdown === "") {
        setAgentMarkdown(note.agents_markdown);
      }
    }
  }, [retrieveNoteQuery.data, retrieveNoteQuery.isSuccess, params.noteId]);

  if (retrieveNoteQuery.isLoading || !note) {
    return <></>;
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const handleCopyClick = () => {
    const textToCopy = agentMarkdown;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
        toast.error("Error copying to clipboard");
      });
  };

  const handleDownloadClick = () => {
    const textToDownload = agentMarkdown;

    const element = document.createElement("a");
    const file = new Blob([textToDownload], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${note?.title}${" " + note?.agents.name}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success("Downloaded");
  };

  const scrollDown = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="flex flex-col gap-8 pt-8 md:pt-0">
            <div className="flex justify-center px-0 pb-4 pt-48 md:px-4 lg:pt-64 ">
              <div className="relative px-8 py-2 pb-24">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <h1 className="max-w-[15ch] text-5xl">{note?.title}</h1>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="flex flex-row items-center gap-1 text-sm opacity-60">
                      <Clock className="h-3 w-3" />
                      {note?.minutes ?? 0} min read
                    </p>
                    <Badge
                      /*@ts-ignore*/
                      variant={note?.category
                        .toLowerCase()
                        .split(" ")
                        .map((word, index) =>
                          index === 0
                            ? word
                            : word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join("")}
                    >
                      #{note?.category}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {/* <div className="flex flex-row overflow-hidden rounded-lg border border-border">
                      <Button
                        className="rounded-br-none rounded-tr-none hover:scale-100 active:scale-100"
                        onClick={() => setReadingMode("normal")}
                        variant={
                          readingMode === "normal" ? "default" : "outline"
                        }
                      >
                        Normal
                      </Button>
                      <Button
                        onClick={() => setReadingMode("agent")}
                        className="rounded-bl-none rounded-tl-none hover:scale-100 active:scale-100"
                        variant={
                          readingMode === "agent" ? "default" : "outline"
                        }
                      >
                        {note?.agents.name}
                      </Button>
                    </div> */}
                    <div className="flex flex-row gap-2">
                      <Button onClick={handleCopyClick} variant={"ghost"}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button onClick={handleDownloadClick} variant={"ghost"}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-[125px] left-8 ">
                  <Image
                    src={`https://images.smart.wtf${note?.agents.pfp!}`}
                    alt="agent"
                    width={100}
                    height={100}
                    className="rounded-full border border-border bg-secondary/90"
                  />
                </div>
                <div className="prose prose-slate pt-12 dark:prose-invert">
                  <Markdown
                    components={{
                      code: ({ className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className ?? "");
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
                    {agentMarkdown}
                  </Markdown>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
