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
      </div>

      <div className="flex flex-row items-center gap-2">
        <ThemeButton className="hidden lg:block" />
      </div>
    </div>
  );
}
