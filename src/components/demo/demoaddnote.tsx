"use client";

import { Button } from "@/components/ui/button";
import { Flame, Loader2, PlusIcon, Wand, XIcon } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useAddNote } from "@/utils/hooks/useaddnote";

export default function DemoAddNote({
  visible = false,
}: {
  visible?: boolean;
}) {
  const [noteInput, setNoteInput] = useState("");
  const [agent, setAgent] = useState<{
    name: "rick" | "mrburns" | "bender" | "patrick";
    id: number;
  }>({ name: "rick", id: 1 });
  const [recommendedSelect, setRecommendedSelect] = useState(-1);
  const [invalidTopic, setInvalidTopic] = useState(false);
  const [recommendedTopics] = useState<string[]>([
    "Shared Covariance Matrix",
    "Logistic Regression",
    "Fall of Roman Empire",
  ]);
  const router = useRouter();

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
          <div>
            <p>Recommended for you</p>
            <div className="flex flex-wrap gap-2">
              {recommendedTopics.map((topic, index) => (
                <Button
                  key={index}
                  className={`transition-all ${
                    recommendedSelect === index ? "border border-primary" : ""
                  }`}
                  onClick={() => {
                    setRecommendedSelect(index);
                    setInvalidTopic(false);
                  }}
                  size={"sm"}
                  variant={"secondary"}
                >
                  {topic}
                </Button>
              ))}
              {recommendedTopics.length === 0 && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1 py-4">
            <Input
              id="name"
              placeholder="// Multi-Variable Calculus"
              className="col-span-3"
              value={noteInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push("/signup");
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
            <h4>Choose your fighter</h4>
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
                src={"https://images.smart.wtf/rick.png"}
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
                src={"https://images.smart.wtf/mrburns.png"}
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
                src={"https://images.smart.wtf/bender.png"}
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
                src={"https://images.smart.wtf/patrick.png"}
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
            onClick={() => {
              setIsOpen(false);
              router.push("/signup");
            }}
          >
            Generate
            <Wand className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
