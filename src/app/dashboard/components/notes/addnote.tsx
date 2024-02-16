"use client";

import { Button } from "@/components/ui/button";
import { Flame, Loader2, PlusIcon, RotateCw, Wand, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useAddNote } from "@/utils/hooks/useaddnote";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AddNote({ visible = false }: { visible?: boolean }) {
  const [noteInput, setNoteInput] = useState("");
  const [agent, setAgent] = useState<{
    name: "rick" | "mrburns" | "bender" | "patrick";
    id: number;
  }>({ name: "rick", id: 1 });
  const [recommendedSelect, setRecommendedSelect] = useState(-1);
  const [invalidTopic, setInvalidTopic] = useState(false);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();
  const [prevTopics, setPrevTopics] = useState<string[]>([]);
  const createNoteMutation = trpc.notes.createNote.useMutation({
    onSuccess: (data) => {
      if (data) {
        if (data.valid) {
          router.push(`/notes/${data.noteId}`);
          setGenerating(false);
          setIsOpen(false);
          setNoteInput("");
        } else {
          setInvalidTopic(true);
          setNoteInput("");
          setGenerating(false);
        }
      }
    },
    onError: () => {
      setGenerating(false);
    },
  });

  const { isOpen, setIsOpen } = useAddNote();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`${visible ? "flex flex-row gap-2" : "hidden"}`}>
          <PlusIcon className="h-4 w-4" />
          Generate
        </Button>
      </DialogTrigger>
      <DialogContent className=" rounded-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="relative ">
            <h3>Generate Note</h3>
            <XIcon
              className="absolute right-2 top-2 h-4 w-4 cursor-pointer transition-all hover:opacity-80"
              onClick={() => setIsOpen(false)}
            />
          </DialogTitle>
          <DialogDescription>
            Generate a note on whatever topic you desire!
          </DialogDescription>
        </DialogHeader>
        <div>
          <p className="text-xl font-bold">
            <span className="text-blue">1{")"}.</span> Enter a topic
          </p>
          <div className="flex flex-col justify-center gap-1 py-4">
            <Textarea
              id="name"
              placeholder="// What's the next mind-boggling mystery you want to unravel"
              className="col-span-3"
              value={noteInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setGenerating(true);
                  createNoteMutation.mutate({
                    agentId: agent.id,
                    title: noteInput,
                  });
                }
              }}
              onChange={(e) => {
                setNoteInput(e.target.value);
                setRecommendedSelect(-1);
                setInvalidTopic(false);
              }}
            />
            <p
              className={`${
                invalidTopic ? "" : "hidden"
              } text-sm text-destructive`}
            >
              Not a valid topic
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <h4>
              <span className="text-xl font-bold text-red-500">2{")"}. </span>
              Choose your fighter
            </h4>
            <Flame className="h-4 w-4 text-destructive" />
          </div>

          <div className="flex flex-wrap gap-2">
            <div
              className={cn(
                `relative cursor-pointer overflow-hidden rounded-full border border-border bg-secondary transition-all hover:scale-[102%] active:scale-[98%]`,
                `${agent.name === "rick" ? "border border-blue" : ""}`,
              )}
              onClick={() => setAgent({ name: "rick", id: 1 })}
            >
              <Image
                className={`absolute bottom-0 left-0 right-0 top-0 z-0 transition-all ${
                  agent.name === "rick" ? "" : "opacity-0"
                }`}
                height={75}
                width={75}
                src={"/fireball.gif"}
                alt="fire"
              />
              <Image
                className="z-10 scale-[110%]"
                src={"/rick.png"}
                width={75}
                height={75}
                alt="rick"
              />
            </div>
            <div
              className={cn(
                `relative cursor-pointer overflow-hidden rounded-full border border-border bg-secondary transition-all hover:scale-[102%] active:scale-[98%]`,
                `${agent.name === "mrburns" ? "border border-mrburns" : ""}`,
              )}
              onClick={() => setAgent({ name: "mrburns", id: 5 })}
            >
              <Image
                className={`absolute bottom-0 left-0 right-0 top-0 z-0 transition-all ${
                  agent.name === "mrburns" ? "" : "opacity-0"
                }`}
                height={75}
                width={75}
                src={"/fireball.gif"}
                alt="fire"
              />
              <Image
                className="z-10 scale-[110%]"
                src={"/mrburns.png"}
                width={75}
                height={75}
                alt="mrburns"
              />
            </div>
            <div
              className={cn(
                `relative cursor-pointer overflow-hidden rounded-full border border-border bg-secondary transition-all hover:scale-[102%] active:scale-[98%]`,
                `${agent.name === "bender" ? "border border-bender" : ""}`,
              )}
              onClick={() => setAgent({ name: "bender", id: 6 })}
            >
              <Image
                className={`absolute bottom-0 left-0 right-0 top-0 z-0 transition-all ${
                  agent.name === "bender" ? "" : "opacity-0"
                }`}
                height={75}
                width={75}
                src={"/fireball.gif"}
                alt="fire"
              />
              <Image
                className="z-10 scale-[125%]"
                src={"/bender.png"}
                width={75}
                height={75}
                alt="bender"
              />
            </div>
            <div
              className={cn(
                `relative cursor-pointer overflow-hidden rounded-full border border-border bg-secondary transition-all hover:scale-[102%] active:scale-[98%]`,
                `${agent.name === "patrick" ? "border border-patrick" : ""}`,
              )}
              onClick={() => setAgent({ name: "patrick", id: 4 })}
            >
              <Image
                className={`absolute bottom-0 left-0 right-0 top-0 z-0 transition-all ${
                  agent.name === "patrick" ? "" : "opacity-0"
                }`}
                height={75}
                width={75}
                src={"/fireball.gif"}
                alt="fire"
              />
              <Image
                className="z-10 scale-[120%]"
                src={"/patrick.png"}
                width={75}
                height={75}
                alt="patrick"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="flex items-center gap-2"
            disabled={
              (noteInput === "" && recommendedSelect === -1) ||
              invalidTopic ||
              generating
            }
            onClick={() => {
              setInvalidTopic(false);
              setGenerating(true);
              createNoteMutation.mutate({
                agentId: agent.id,
                title: noteInput,
              });
            }}
            type="submit"
          >
            {generating ? "Generating" : "Generate"}
            <Wand className="h-4 w-4" />
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={generating}
                onClick={() => {
                  setInvalidTopic(false);
                  setGenerating(true);
                  createNoteMutation.mutate({
                    agentId: agent.id,
                    title: "RANDOM",
                  });
                }}
                variant={"rainbow"}
              >
                ???
              </Button>
            </TooltipTrigger>
            <TooltipContent>Generate random topic</TooltipContent>
          </Tooltip>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
