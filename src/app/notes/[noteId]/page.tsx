"use client";

import { useEffect, useState } from "react";
import NotesHeading from "../components/notesheading";
import { useNoteContext } from "../context/notescontext";
import { trpc } from "@/trpc/client";
import { type Note } from "@/types";
import Image from "next/image";

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

  return (
    <>
      <NotesHeading currentNote={{ id: parseInt(params.noteId) }} />
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
          <div className="prose prose-slate relative px-8 py-2 pb-24 dark:prose-invert">
            <div>
              <h1>{note?.title}</h1>
              <p className="text-xs opacity-60">
                {note?.minutes} min read • {note?.category}
              </p>
            </div>
            <div className="absolute -top-[125px] left-0">
              <Image
                src={note?.agents.pfp!}
                alt="agent"
                width={100}
                height={100}
                className="rounded-full border border-border bg-secondary/90"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
