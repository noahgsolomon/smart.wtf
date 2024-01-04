"use client";

import ThemeButton from "@/components/nav/theme";
import { buttonVariants } from "@/components/ui/button";
import { X } from "lucide-react";

export default function QuizHeading({
  noteId,
  q,
}: {
  noteId: string;
  q: string;
}) {
  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex w-screen flex-row items-center justify-between border-b border-border bg-card  px-2 py-2 md:px-10">
      <a href={`/dashboard`} className={buttonVariants({ variant: "ghost" })}>
        <X className="h-4 w-4" />
      </a>
      <div className="flex flex-row items-center gap-2">
        <ThemeButton className="hidden md:block" />
      </div>
    </div>
  );
}
