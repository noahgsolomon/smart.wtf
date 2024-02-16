"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useMemo, useState } from "react";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { CornerDownRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGenerationType } from "@/utils/hooks/usegenerationtype";
import { set } from "date-fns";
import { useAddingNote } from "@/utils/hooks/useaddingnote";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DashboardNew() {
  const recommendedNotesQuery = trpc.notes.recommendedNotes.useQuery();
  const [recommendedTopics, setRecommendedTopics] = useState<string[]>([]);
  const router = useRouter();
  const [inputTopic, setInputTopic] = useState("");
  const [generating, setGenerating] = useState(false);

  const { setAgent: setAddingNoteAgent, setNoteId, setTopic } = useAddingNote();

  const createNoteMutation = trpc.notes.createNote.useMutation({
    onSuccess: (data) => {
      if (data) {
        if (data.valid) {
          setNoteId(parseInt(data.noteId!));
          setTopic(inputTopic);
          setAgent(agent);
          setIsOpen(true);
          setGenerating(false);
          setInputTopic("");
        } else {
          toast.error("Invalid topic");
          setInputTopic("");
          setGenerating(false);
        }
      }
    },
    onError: () => {
      setGenerating(false);
    },
  });

  const [isChangeAgentOpen, setIsChangeAgentOpen] = useState(false);

  const { isOpen, setIsOpen } = useGenerationType();

  const [agent, setAgent] = useState<{
    name: "rick" | "mrburns" | "bender" | "patrick";
    id: number;
  }>({ name: "rick", id: 1 });

  useMemo(() => {
    if (recommendedNotesQuery.isFetched && recommendedNotesQuery.data) {
      const recommended = recommendedNotesQuery.data;
      setRecommendedTopics(recommended);
    }
  }, [recommendedNotesQuery.isFetched, recommendedNotesQuery.data]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative w-full">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (inputTopic === "") return;
              setGenerating(true);
              createNoteMutation.mutate({
                agentId: agent.id,
                title: inputTopic,
              });
            }
          }}
          onChange={(e) => setInputTopic(e.target.value)}
          value={inputTopic}
          maxLength={50}
          placeholder="Let's learn something new..."
          className="relative w-full rounded-lg border-2 bg-card/80 py-8 pl-16 pr-[3.5rem] text-2xl font-bold text-primary opacity-80 shadow-lg transition-all placeholder:text-primary/80 focus:border-lightBlue md:py-10 md:pl-24 md:pr-20 "
        />
        <HoverCard
          openDelay={100}
          onOpenChange={setIsChangeAgentOpen}
          open={isChangeAgentOpen}
        >
          <HoverCardTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute left-2 top-1/2 h-[50px] w-[50px] -translate-y-1/2 transform overflow-hidden rounded-lg md:h-[65px] md:w-[65px]">
                  <Image
                    src={`https://images.smart.wtf/${agent.name}.png`}
                    alt="agent"
                    width={65}
                    height={65}
                    onClick={() => {
                      setAgent((prev) => {
                        if (prev.name === "rick") {
                          return { name: "mrburns", id: 5 };
                        } else if (prev.name === "mrburns") {
                          return { name: "bender", id: 6 };
                        } else if (prev.name === "patrick") {
                          return { name: "rick", id: 1 };
                        } else {
                          return { name: "patrick", id: 4 };
                        }
                      });
                    }}
                    className={`absolute z-10 cursor-pointer rounded-lg border border-border/80 transition-all hover:scale-[101%] active:scale-[99%] md:h-[65px] md:w-[65px]`}
                  />
                  <Image
                    className={`absolute z-0 overflow-hidden transition-all`}
                    height={75}
                    width={75}
                    src={"/fireball.gif"}
                    alt="fire"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="coarse:hidden">
                Change your agent
              </TooltipContent>
            </Tooltip>
          </HoverCardTrigger>
          <HoverCardContent
            className="absolute -left-2 -top-[0.5rem] w-[100px] transform border-none bg-transparent shadow-none coarse:hidden"
            asChild
          >
            <div className="flex flex-col gap-1">
              <Image
                src={`https://images.smart.wtf/bender.png`}
                onClick={() => {
                  setAgent({ name: "bender", id: 6 });
                  setIsChangeAgentOpen(false);
                }}
                alt="agent"
                width={65}
                height={65}
                className={`${
                  agent.name === "bender" ? "hidden" : ""
                } h-[50px] w-[50px] transform cursor-pointer rounded-lg border bg-secondary/80 transition-all hover:scale-[101%] active:scale-[99%] md:h-[65px] md:w-[65px]`}
              />

              <Image
                onClick={() => {
                  setAgent({ name: "mrburns", id: 5 });
                  setIsChangeAgentOpen(false);
                }}
                src={`https://images.smart.wtf/mrburns.png`}
                alt="agent"
                width={65}
                height={65}
                className={`${
                  agent.name === "mrburns" ? "hidden" : ""
                } h-[50px] w-[50px] transform cursor-pointer rounded-lg border bg-secondary/80 transition-all hover:scale-[101%] active:scale-[99%] md:h-[65px] md:w-[65px]`}
              />
              <Image
                src={`https://images.smart.wtf/patrick.png`}
                onClick={() => {
                  setAgent({ name: "patrick", id: 4 });
                  setIsChangeAgentOpen(false);
                }}
                alt="agent"
                width={65}
                height={65}
                className={`${
                  agent.name === "patrick" ? "hidden" : ""
                } h-[50px] w-[50px] transform cursor-pointer rounded-lg border bg-secondary/80 transition-all hover:scale-[101%] active:scale-[99%] md:h-[65px] md:w-[65px]`}
              />
              <Image
                src={`https://images.smart.wtf/rick.png`}
                onClick={() => {
                  setAgent({ name: "rick", id: 1 });
                  setIsChangeAgentOpen(false);
                }}
                alt="agent"
                width={65}
                height={65}
                className={`${
                  agent.name === "rick" ? "hidden" : ""
                } h-[50px] w-[50px] transform cursor-pointer rounded-lg border bg-secondary/80 transition-all hover:scale-[101%] active:scale-[99%] md:h-[65px] md:w-[65px]`}
              />
            </div>
          </HoverCardContent>
        </HoverCard>

        <Button
          disabled={generating}
          onClick={() => {
            if (inputTopic === "") return;
            setGenerating(true);
            createNoteMutation.mutate({
              agentId: agent.id,
              title: inputTopic,
            });
          }}
          className={`${
            inputTopic === "" ? "opacity-0" : ""
          }  absolute right-2 top-1/2 -translate-y-1/2 transform rounded-lg px-[1rem] py-[1.5rem] transition-all md:px-[1.5rem] md:py-[2rem]`}
        >
          {generating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CornerDownRight className="h-4 w-4 " />
          )}
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-1 opacity-80">
        {recommendedTopics.map((topic, index) => (
          <Button
            key={topic}
            size={"sm"}
            className="rounded-lg border bg-card/80 text-xs text-primary hover:bg-card hover:text-primary md:text-sm"
            onClick={() => {
              setGenerating(true);
              createNoteMutation.mutate({
                agentId: agent.id,
                title: inputTopic,
              });
            }}
          >
            {topic}
          </Button>
        ))}
        {recommendedTopics.length === 0 && (
          <>
            <Button
              size={"sm"}
              className="mb-8 rounded-lg border bg-card/80 text-xs text-primary/80 hover:bg-card hover:text-primary md:text-base"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
