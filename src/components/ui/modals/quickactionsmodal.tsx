"use client";

import { useEffect } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { Bot, Feather, FileQuestion, Landmark, User2 } from "lucide-react";

import { DialogModal } from "./dialoguemodal";
import { useQuickActions } from "@/utils/hooks/usequickactions";
import Link from "next/link";
import { useAddNote } from "@/utils/hooks/useaddnote";
import { usePathname } from "next/navigation";
import { useChatContext } from "@/app/context/chat/ChatContext";

export const QuickActionsModal = () => {
  const { isOpen, setIsOpen } = useQuickActions();
  const { setIsOpen: setIsAddNoteOpen } = useAddNote();
  const pathname = usePathname();

  const { setOpen: setChatOpen } = useChatContext();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setIsOpen]);

  return (
    <DialogModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <div
                onClick={() => {
                  setIsOpen(false);
                  setIsAddNoteOpen(true);
                }}
                className="z-10 flex h-full w-full cursor-pointer flex-row gap-2"
              >
                <Feather className="h-4 w-4" />
                <span>Generate Note</span>
              </div>
            </CommandItem>
            <CommandItem>
              <Link
                href={`/quiz?prev=${pathname}`}
                onClick={() => {
                  setIsOpen(false);
                  setIsAddNoteOpen(false);
                }}
                className="z-10 flex h-full w-full cursor-pointer flex-row gap-2"
              >
                <FileQuestion className="h-4 w-4" />
                <span>Generate Quiz</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <div
                onClick={() => {
                  setIsOpen(false);
                  setIsAddNoteOpen(false);
                  setChatOpen(true);
                }}
                className="z-10 flex h-full w-full cursor-pointer flex-row gap-2"
              >
                <Bot className="h-4 w-4" />
                <span>Chat</span>
              </div>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <Link
                onClick={() => setIsOpen(false)}
                className="flex h-full w-full flex-row gap-2"
                href={"/settings/account"}
              >
                <User2 className=" h-4 w-4" />
                <span>Account</span>
              </Link>
            </CommandItem>
            <CommandItem>
              <Link
                onClick={() => setIsOpen(false)}
                className="flex h-full w-full flex-row gap-2"
                href={"/settings/billing"}
              >
                <Landmark className="h-4 w-4" />
                <span>Billing</span>
              </Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </DialogModal>
  );
};
