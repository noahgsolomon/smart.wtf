"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { PlusIcon, X } from "lucide-react";

import ThemeButton from "@/components/nav/theme";
import { useNoteContext } from "../context/notescontext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Fragment } from "react";
import { useRouter } from "next13-progressbar";
import { useAddNote } from "@/utils/hooks/useaddnote";

export default function NotesHeading({
  currentNote,
}: {
  currentNote: { id: number };
}) {
  const { openNotes, setOpenNotes, userNotes } = useNoteContext();
  const router = useRouter();
  const { setIsOpen } = useAddNote();

  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex w-screen flex-row items-center justify-between border-b border-border bg-card  px-2 py-2 shadow-sm md:px-10">
      <div className="flex flex-row items-center gap-4">
        <a href={`/dashboard`} className={buttonVariants({ variant: "ghost" })}>
          <X className="h-4 w-4" />
        </a>
        <div className="flex flex-row items-center gap-2">
          <Button onClick={() => setIsOpen(true)} variant={"ghost"}>
            <PlusIcon className="h-4 w-4" />
          </Button>
          <div className="flex flex-row items-center gap-1">
            {openNotes.map((note, index) => (
              <Fragment key={note.id}>
                {openNotes.length > 1 && note.id !== currentNote.id ? (
                  <Button
                    key={note.id}
                    variant={note.id === currentNote.id ? "secondary" : "ghost"}
                    className="group flex flex-row justify-between gap-2 border border-border"
                    onClick={() => {
                      router.push(`/notes/${note.id}`);
                    }}
                  >
                    <p>{note.emoji}</p>
                    <p
                      className={`hidden font-bold ${
                        openNotes.length > 2 ? "" : "lg:block"
                      }`}
                    >
                      {note.title}
                    </p>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenNotes(
                          openNotes.filter(
                            (openNote) => openNote.id !== note.id,
                          ),
                        );
                      }}
                      className="z-10"
                    >
                      <X className="h-4 w-4 text-primary transition-all hover:text-destructive group-hover:opacity-100 sm:opacity-0" />
                    </div>
                  </Button>
                ) : (
                  <>
                    {index < 5 ? (
                      <Button
                        key={note.id}
                        variant={
                          note.id === currentNote.id ? "secondary" : "ghost"
                        }
                        className="group flex flex-row justify-between gap-2"
                        onClick={() => {
                          router.push(`/notes/${note.id}`);
                        }}
                      >
                        <p>{note.emoji}</p>
                        <p
                          className={`hidden font-bold ${
                            openNotes.length > 2 ? "" : "lg:block"
                          }`}
                        >
                          {note.title}
                        </p>
                      </Button>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <ThemeButton className="hidden lg:block" />
      </div>
    </div>
  );
}
