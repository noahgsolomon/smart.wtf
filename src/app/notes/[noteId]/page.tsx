"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NotesHeading from "../components/notesheading";
import { useNoteContext } from "../context/notescontext";
import { trpc } from "@/trpc/client";
import { type Note } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Clock, Info, Loader2 } from "lucide-react";
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
import { useRegenerate } from "./useRegenerate";
import { useContinue } from "./useContinue";

type UserNote = {
  id: number;
  agents: {
    pfp: string;
  };
  title: string;
};

export default function Page({ params }: { params: { noteId: string } }) {
  const retrieveNoteQuery = trpc.notes.getNote.useQuery({
    id: parseInt(params.noteId),
  });

  const retrieveUserNotesQuery = trpc.notes.getUserNotesMeta.useQuery();
  const generatedGif = useMemo(
    () => `/generating${Math.floor(Math.random() * 4)}.gif`,
    [],
  );

  const [imageMutationCalled, setImageMutationCalled] = useState(false);
  const { openNotes, setOpenNotes, setUserNotes } = useNoteContext();
  const [note, setNote] = useState<Note | null>(null);
  const [readingMode, setReadingMode] = useState<"normal" | "agent">("normal");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [markdown, setMarkdown] = useState("");
  const [agentMarkdown, setAgentMarkdown] = useState("");

  const {
    handleRegenerate: agentHandleRegenerate,
    regenerating: agentRegenerating,
  } = useRegenerate({
    note: { id: note?.id!, title: note?.title! },
    markdown: agentMarkdown,
    setMarkdown: setAgentMarkdown,
    agent: true,
    agentPrompt: note?.agents.prompt,
  });

  const { continuing: agentContinuing, handleContinue: agentHandleContinue } =
    useContinue({
      note: { id: note?.id!, title: note?.title! },
      markdown: agentMarkdown,
      setMarkdown: setAgentMarkdown,
      agent: true,
      agentPrompt: note?.agents.prompt,
    });

  const { handleRegenerate, regenerating } = useRegenerate({
    note: { id: note?.id!, title: note?.title! },
    markdown: markdown,
    setMarkdown: setMarkdown,
  });

  const { continuing, handleContinue } = useContinue({
    note: { id: note?.id!, title: note?.title! },
    markdown: markdown,
    setMarkdown: setMarkdown,
  });

  const [hasRegenerated, setHasRegenerated] = useState(false);
  const [hasAgentRegenerated, setHasAgentRegenerated] = useState(false);

  useEffect(() => {
    if (note && note.id && note.title && !hasRegenerated && !note.markdown) {
      setHasRegenerated(true);
      handleRegenerate();
    }
    if (
      note &&
      note.id &&
      note.title &&
      !hasAgentRegenerated &&
      !note.agents_markdown
    ) {
      setHasAgentRegenerated(true);
      agentHandleRegenerate();
    }
  }, [note, markdown, agentMarkdown, handleRegenerate, agentHandleRegenerate]);

  const createImageMutation = trpc.notes.createImage.useMutation({
    onSuccess: (data) => {
      setImageSrc(data.imageUrl!);
      console.log("Success:", data);
      setNote((prev) => (prev ? { ...prev, imageUrl: data.imageUrl! } : null));
    },
  });

  useEffect(() => {
    const note = retrieveNoteQuery.data?.note;
    if (note) {
      setNote(note);
      if (note.markdown) {
        setMarkdown(note.markdown);
      }
      if (note.agents_markdown) {
        setAgentMarkdown(note.agents_markdown);
      }

      if (!note.imageUrl && !imageMutationCalled) {
        setImageMutationCalled(true);
        createImageMutation.mutate({
          id: note.id,
          title: note.title,
        });
      } else if (note.imageUrl) {
        setImageSrc(note.imageUrl);
      }

      const noteId = parseInt(params.noteId);
      if (!openNotes.some((openNote) => openNote.id === noteId)) {
        setOpenNotes((prev) => [
          ...prev,
          {
            id: noteId,
            pfp: note.agents.pfp,
            title: note.title,
          },
        ]);
      }
    }
  }, [
    setOpenNotes,
    retrieveNoteQuery.data,
    retrieveNoteQuery.isSuccess,
    params.noteId,
    openNotes,
    imageMutationCalled,
    createImageMutation,
  ]);

  useEffect(() => {
    const userNotes = retrieveUserNotesQuery.data?.notes;
    if (userNotes) {
      setUserNotes(
        userNotes.map((note: UserNote) => ({
          id: note.id,
          pfp: note.agents.pfp,
          title: note.title,
        })),
      );
    }
  }, [
    retrieveUserNotesQuery.data,
    retrieveUserNotesQuery.isSuccess,
    setUserNotes,
  ]);

  if (retrieveNoteQuery.isLoading || retrieveUserNotesQuery.isLoading) {
    return <></>;
  }

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <NotesHeading currentNote={{ id: parseInt(params.noteId) }} />
      <AnimatePresence>
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="flex flex-col gap-8 pt-[3rem]">
            <div className="relative h-[250px] w-full overflow-hidden md:h-[350px]">
              {imageSrc ? (
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={imageSrc}
                  alt={"note image"}
                  className="border-b border-border"
                />
              ) : (
                <>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={generatedGif}
                    alt={"note image"}
                    className="border-b border-border"
                  />
                  <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-row items-center justify-center gap-1">
                    <div className="flex flex-col items-center rounded-lg border border-border bg-secondary p-2 opacity-60">
                      <p>Crafting image</p>
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className=" flex justify-center px-0 pb-4 pt-8 md:px-4">
              <div className="relative px-8 py-2 pb-24">
                <div className="flex flex-col gap-2">
                  <h1 className="max-w-[15ch] text-5xl">{note?.title}</h1>
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
                      {note?.category}
                    </Badge>
                  </div>
                  <div className="flex">
                    <div className="flex flex-row overflow-hidden rounded-lg border border-border">
                      <Button
                        className="rounded-br-none rounded-tr-none hover:scale-100 active:scale-100"
                        onClick={() => setReadingMode("normal")}
                        variant={readingMode === "normal" ? "default" : "ghost"}
                      >
                        Normal
                      </Button>
                      <Button
                        onClick={() => setReadingMode("agent")}
                        className="rounded-bl-none rounded-tl-none hover:scale-100 active:scale-100"
                        variant={readingMode === "agent" ? "default" : "ghost"}
                      >
                        {note?.agents.name}
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-1 text-sm text-primary/50">
                    {regenerating || agentRegenerating ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-1">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </div>
                        <p>
                          This should take a few minutes. Please stay on this
                          screen.
                        </p>
                      </div>
                    ) : (
                      <>
                        <Info className="h-3 w-3 " />
                        <p>
                          note: we're not always right, click{" "}
                          <Button
                            variant={"link"}
                            className="text-primay/80 m-0 p-0 font-bold"
                            onClick={
                              readingMode === "agent"
                                ? agentHandleRegenerate
                                : handleRegenerate
                            }
                          >
                            here
                          </Button>{" "}
                          to regenerate
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="absolute -top-[125px] left-8 ">
                  <Image
                    src={note?.agents.pfp!}
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
                    {readingMode === "normal" ? markdown : agentMarkdown}
                  </Markdown>
                </div>
                {!regenerating &&
                  !continuing &&
                  !agentRegenerating &&
                  !agentContinuing && (
                    <div className="flex flex-row items-center gap-2 pt-8">
                      <Button
                        onClick={
                          readingMode === "agent"
                            ? agentHandleContinue
                            : handleContinue
                        }
                        className="flex flex-row gap-1 py-5"
                      >
                        Continue
                      </Button>
                      <p>or</p>
                      <Button
                        variant={"secondary"}
                        className="flex flex-row gap-1  py-5"
                      >
                        Move on to Gradient Vectors
                      </Button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
