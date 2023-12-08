"use client";

import { Button } from "@/components/ui/button";
import { Flame, PlusIcon, Wand } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function AddNote() {
  const [noteInput, setNoteInput] = useState("");
  const [agent, setAgent] = useState<
    "rick" | "mrburns" | "patrick" | "bender" | ""
  >("rick");
  const [recommendedSelect, setRecommendedSelect] = useState(-1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex flex-row gap-2">
          <PlusIcon className="h-4 w-4" />
          Generate Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <h3>Generate Note</h3>
          </DialogTitle>
          <DialogDescription>
            Generate a note on whatever topic you desire!
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <p>Recommended for you</p>
            <div className="flex flex-wrap gap-2">
              <Button
                className={`transition-all ${
                  recommendedSelect === 0 ? "border border-primary" : ""
                }`}
                onClick={() => setRecommendedSelect(0)}
                size={"sm"}
                variant={"secondary"}
              >
                Partial Derivatives
              </Button>
              <Button
                className={`transition-all ${
                  recommendedSelect === 1 ? "border border-primary" : ""
                }`}
                onClick={() => setRecommendedSelect(1)}
                size={"sm"}
                variant={"secondary"}
              >
                Dot Product
              </Button>
              <Button
                className={`transition-all ${
                  recommendedSelect === 2 ? "border border-primary" : ""
                }`}
                onClick={() => setRecommendedSelect(2)}
                size={"sm"}
                variant={"secondary"}
              >
                Docker
              </Button>
              <Button
                className={`transition-all ${
                  recommendedSelect === 3 ? "border border-primary" : ""
                }`}
                onClick={() => setRecommendedSelect(3)}
                size={"sm"}
                variant={"secondary"}
              >
                Combinatorics
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 py-4">
            <Input
              id="name"
              placeholder="// Multi-Variable Calculus"
              className="col-span-3"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <h4>Choose your fighter</h4>
            <Flame className="h-4 w-4 text-destructive" />
          </div>

          <div className="flex flex-wrap gap-2">
            <div
              className={cn(
                `relative cursor-pointer overflow-hidden rounded-full border border-border bg-secondary transition-all hover:scale-[102%] active:scale-[98%]`,
                `${agent === "rick" ? "border border-blue" : ""}`,
              )}
              onClick={() => setAgent("rick")}
            >
              <Image
                className={`absolute bottom-0 left-0 right-0 top-0 z-0 transition-all ${
                  agent === "rick" ? "" : "opacity-0"
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
                `${agent === "mrburns" ? "border border-mrburns" : ""}`,
              )}
              onClick={() => setAgent("mrburns")}
            >
              <Image
                className={`absolute bottom-0 left-0 right-0 top-0 z-0 transition-all ${
                  agent === "mrburns" ? "" : "opacity-0"
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
                `${agent === "bender" ? "border border-bender" : ""}`,
              )}
              onClick={() => setAgent("bender")}
            >
              <Image
                className={`absolute bottom-0 left-0 right-0 top-0 z-0 transition-all ${
                  agent === "bender" ? "" : "opacity-0"
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
                `${agent === "patrick" ? "border border-patrick" : ""}`,
              )}
              onClick={() => setAgent("patrick")}
            >
              <Image
                className={`absolute bottom-0 left-0 right-0 top-0 z-0 transition-all ${
                  agent === "patrick" ? "" : "opacity-0"
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
              (noteInput === "" && recommendedSelect === -1) || agent === ""
            }
            type="submit"
          >
            Generate
            <Wand className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
