"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useAddingNote } from "@/utils/hooks/useaddingnote";
import { useGenerationType } from "@/utils/hooks/usegenerationtype";
import { ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function GenerationType() {
  const { isOpen, setIsOpen } = useGenerationType();
  const { agent, noteId, topic } = useAddingNote();
  const [typeSelected, setTypeSelected] = useState<"podcast" | "note" | "">("");
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" rounded-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="relative ">
            <h3>How would you like to learn?</h3>
          </DialogTitle>
          <DialogDescription>
            Choose a learning style to generate a note
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4">
          <Button
            variant={"none"}
            onClick={() => {
              // router.push(`/notes/${noteId}`);
              // setIsOpen(false);
              // toast.info("Preparing your note...");
            }}
            className={cn(
              `relative flex h-[250px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-purple-500 bg-purple-200 shadow-sm transition-all hover:scale-[101%] hover:opacity-80 active:scale-[99%] dark:border-purple-900/80 dark:bg-purple-400/80`,
            )}
          >
            <Badge
              variant={"history"}
              className="absolute -right-2 -top-2 z-10"
            >
              Coming Soon
            </Badge>
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30"></div>
            <p className="text-xl font-bold text-secondary/80 dark:text-primary/80">
              Podcast Style
            </p>
            <svg
              className="text-secondary/60 dark:text-primary/60"
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M2 10v3" />
              <path d="M6 6v11" />
              <path d="M10 3v18" />
              <path d="M14 8v7" />
              <path d="M18 5v13" />
              <path d="M22 10v3" />
            </svg>
          </Button>
          <Button
            variant={"none"}
            disabled={typeSelected === "podcast" || typeSelected === "note"}
            onClick={() => {
              router.push(`/notes/${noteId}`);
              setIsOpen(false);
              toast.info("Preparing your note...");
            }}
            className={cn(
              `flex h-[250px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue bg-lightBlue shadow-sm transition-all hover:scale-[101%] hover:opacity-80 active:scale-[99%]`,
            )}
          >
            <p className="text-xl font-bold text-secondary/80 dark:text-primary/80 ">
              Note Style
            </p>
            <ScrollText className="h-[64px] w-[64px] text-secondary/60 dark:text-primary/60 " />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
