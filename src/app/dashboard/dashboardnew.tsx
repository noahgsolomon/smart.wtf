"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

export default function DashboardNew() {
  const [prevTopics, setPrevTopics] = useState<string[]>([]);
  const recommendedNotesQuery = trpc.notes.recommendedNotes.useQuery({
    prev: prevTopics,
  });
  const [recommendedTopics, setRecommendedTopics] = useState<string[]>([]);
  const [inputTopic, setInputTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const createNoteMutation = trpc.notes.createNote.useMutation();
  const [agent, setAgent] = useState<{
    name: "rick" | "mrburns" | "bender" | "patrick";
    id: number;
  }>({ name: "rick", id: 1 });

  useEffect(() => {
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
          placeholder="What's the next mind-boggling mystery you want to unravel"
          className=" relative w-full rounded-full border-2 bg-card/80 py-10 pl-24 text-2xl font-bold opacity-80 shadow-lg transition-all focus:border-blue/60 "
        />
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Image
              src={`https://images.smart.wtf/${agent.name}.png`}
              alt="agent"
              width={65}
              height={65}
              className={`border-${agent.name}/80 absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer rounded-full border-2 bg-secondary/80 transition-all hover:scale-[101%] active:scale-[99%]`}
            />
          </TooltipTrigger>
          <TooltipContent className="opacity-80">Your agent</TooltipContent>
        </Tooltip>
        <Button
          disabled={inputTopic === "" || generating}
          onClick={() => {
            if (inputTopic === "") return;
            setGenerating(true);
            createNoteMutation.mutate({
              agentId: agent.id,
              title: inputTopic,
            });
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full px-[1.5rem] py-[2rem]"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-1 opacity-80">
        {recommendedTopics.map((topic, index) => (
          <Button
            key={topic}
            size={"sm"}
            className="rounded-full border bg-card/80 text-xs text-primary/80 hover:bg-card hover:text-primary md:text-base"
            onClick={() => {
              setGenerating(true);
              createNoteMutation.mutate({
                agentId: agent.id,
                title: recommendedTopics[index]!,
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
              className="rounded-full border bg-card/80 text-xs text-primary/80 hover:bg-card hover:text-primary md:text-base"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
