"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { trpc } from "@/trpc/client";
import { Lightbulb, Loader2 } from "lucide-react";
import { type ReactNode, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSectionContext } from "../../sectioncontext";

export default function Understanding({
  question,
  subSection,
  blockId,
  questionString,
  explanation,
  completed,
}: {
  blockId: number;
  subSection: number;
  question: ReactNode;
  questionString: string;
  explanation: ReactNode;
  explanationString: string;
  completed: boolean;
}) {
  const [userExplanation, setUserExplanation] = useState("");
  const maxExplanationLength = 250;
  const mutateBlock = trpc.course.setBlockCompleted.useMutation();

  const [side, setSide] = useState<"front" | "back">(
    completed ? "back" : "front",
  );

  const [loading, setLoading] = useState(false);

  const { section, setSection } = useSectionContext();

  const [isFlipped, setIsFlipped] = useState(completed);
  const [submitError, setSubmitError] = useState(false);

  const [correct, setCorrect] = useState<null | boolean>(null);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    setSide((prev) => (prev === "front" ? "back" : "front"));
  };

  const revealedAnswer = () => {
    if (!completed) {
      mutateBlock.mutate({
        blockId,
      });

      setSection((prev) => {
        return prev.map((section, index) => {
          if (index === subSection - 1) {
            const updatedBlocks = section.blocks.map((block) => {
              if (block.id === blockId) {
                const updatedUserCompletedBlocks = [
                  ...block.userCompletedBlocks,
                  { blockId: blockId },
                ];
                return {
                  ...block,
                  userCompletedBlocks: updatedUserCompletedBlocks,
                };
              }
              return block;
            });
            return { ...section, blocks: updatedBlocks };
          }
          return section;
        });
      });

      const currentBlock = section[subSection - 1]?.blocks.find(
        (b) => b.id === blockId,
      );

      const nextBlock = section[subSection - 1]?.blocks.find(
        (b) => b.order === currentBlock?.order! + 1,
      );

      const currentBlockOrder = currentBlock?.order!;

      const isNotLastBlockInSubsection =
        currentBlockOrder < (section[subSection - 1]?.blocks.length ?? 0);

      if (isNotLastBlockInSubsection && nextBlock) {
        setTimeout(() => {
          document.getElementById(nextBlock.id.toString())!.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      }
    }
    toggleFlip();
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (userExplanation.length === 0) {
      toast.error("Please provide an explanation.");
      setSubmitError(true);
      setTimeout(() => {
        setSubmitError(false);
      }, 1000);
      return;
    }
    try {
      const response = await fetch("/api/ai/understanding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: questionString,
          answer: userExplanation,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const dataBody = await data.body.data;
      setCorrect(dataBody.correct);
      console.log(dataBody.correct);
      if (dataBody.correct) {
        mutateBlock.mutate({
          blockId,
        });

        setSection((prev) => {
          return prev.map((section, index) => {
            if (index === subSection - 1) {
              const updatedBlocks = section.blocks.map((block) => {
                if (block.id === blockId) {
                  const updatedUserCompletedBlocks = [
                    ...block.userCompletedBlocks,
                    { blockId: blockId },
                  ];
                  return {
                    ...block,
                    userCompletedBlocks: updatedUserCompletedBlocks,
                  };
                }
                return block;
              });
              return { ...section, blocks: updatedBlocks };
            }
            return section;
          });
        });

        toast.success("correct!");
        const currentBlock = section[subSection - 1]?.blocks.find(
          (b) => b.id === blockId,
        );

        const nextBlock = section[subSection - 1]?.blocks.find(
          (b) => b.order === currentBlock?.order! + 1,
        );

        const currentBlockOrder = currentBlock?.order!;

        const isNotLastBlockInSubsection =
          currentBlockOrder < (section[subSection - 1]?.blocks.length ?? 0);

        if (isNotLastBlockInSubsection && nextBlock) {
          setTimeout(() => {
            document.getElementById(nextBlock.id.toString())!.scrollIntoView({
              behavior: "smooth",
            });
          }, 100);
        }
      } else {
        toast.error("incorrect!");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
      <div className="card-container">
        <div
          className={`card rounded-lg border ${
            completed && correct !== false
              ? "border-success"
              : correct === false
              ? "border-destructive"
              : "border-border"
          } ${isFlipped ? "is-flipped" : ""}`}
        >
          {side === "front" ? (
            <div className="front">
              <div className="relative">
                <div className="pb-4">{question}</div>
                <Textarea
                  className="h-[125px] bg-background"
                  value={userExplanation}
                  onChange={(e) => {
                    if (e.target.value.length > maxExplanationLength) return;
                    setUserExplanation(e.target.value);
                  }}
                  placeholder="Type your explanation here."
                />
                <div
                  className={`${
                    userExplanation.length === maxExplanationLength
                      ? "text-destructive"
                      : ""
                  } absolute bottom-2 left-2 m-0 rounded-lg border border-border bg-background px-1 text-base opacity-60`}
                >
                  {userExplanation.length}/{maxExplanationLength}
                </div>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger className="absolute bottom-2 right-2 ">
                      <Button
                        onClick={revealedAnswer}
                        size={"sm"}
                        className="items-center rounded-lg border border-border hover:text-yellow-500"
                      >
                        <Lightbulb className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>click to reveal explanation</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="py-2">
                <Button
                  variant={submitError ? "destructive" : "default"}
                  onClick={handleSubmit}
                  disabled={submitError || loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "submit"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="back">
              <div className="pt-4 text-2xl font-bold">Explanation</div>
              {explanation}
              <div className="pb-4">
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    setIsFlipped(false);
                    setSide("front");
                  }}
                >
                  Back to problem
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
