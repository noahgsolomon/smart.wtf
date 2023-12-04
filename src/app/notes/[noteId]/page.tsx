"use client";

import { useEffect, useState } from "react";
import NotesHeading from "../components/notesheading";
import { useNoteContext } from "../context/notescontext";
import { trpc } from "@/trpc/client";
import { type Note } from "@/types";
import Image from "next/image";
import { ArrowRight, ArrowRightCircle, Clock, PlusCircle } from "lucide-react";
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

  const { openNotes, setOpenNotes, setUserNotes } = useNoteContext();
  const [note, setNote] = useState<Note | null>(null);
  const [readingMode, setReadingMode] = useState<"normal" | "agent">("normal");

  console.log(openNotes);

  useEffect(() => {
    const note = retrieveNoteQuery.data?.note;
    if (note) {
      setNote(note);

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
            <div className="relative h-[250px] w-full overflow-hidden">
              <Image
                layout="fill"
                objectFit="cover"
                src={note?.imageUrl!}
                alt={"note image"}
                className="border-b border-border"
              />
            </div>

            <div className="flex justify-center px-0 pb-4 pt-8 md:px-4">
              <div className="relative px-8 py-2 pb-24">
                <div className="flex flex-col gap-2">
                  <h1 className="text-5xl">{note?.title}</h1>
                  <div className="flex flex-row gap-2">
                    <p className="flex flex-row items-center gap-1 text-sm opacity-60">
                      <Clock className="h-3 w-3" />
                      {note?.minutes} min read
                    </p>
                    {/*@ts-ignore*/}
                    <Badge variant={note?.category.toLowerCase()}>
                      {note?.category}
                    </Badge>
                  </div>
                  <div className="flex">
                    <div className="flex flex-row overflow-hidden rounded-lg border border-border">
                      <Button
                        className="rounded-br-none rounded-tr-none"
                        onClick={() => setReadingMode("normal")}
                        variant={readingMode === "normal" ? "default" : "ghost"}
                      >
                        Normal
                      </Button>
                      <Button
                        onClick={() => setReadingMode("agent")}
                        className="rounded-bl-none rounded-tl-none"
                        variant={readingMode === "agent" ? "default" : "ghost"}
                      >
                        {note?.agents.name}
                      </Button>
                    </div>
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
                    {readingMode === "normal"
                      ? note?.markdown
                      : note?.agents_markdown}
                  </Markdown>
                </div>
                <div className="flex flex-row items-center gap-2 pt-8">
                  <Button className="flex flex-row gap-1" variant={"outline"}>
                    Generate More
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  <p>or</p>
                  <Button variant={"secondary"} className="flex flex-row gap-1">
                    Create Note: Gradient Vectors
                    <ArrowRightCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
