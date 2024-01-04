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
import useSound from "use-sound";
import { toast } from "sonner";

export default function Understanding({
  question,
  explanation,
  completed,
}: {
  question: string;
  explanation: string;
  completed: boolean;
}) {
  const [userExplanation, setUserExplanation] = useState("");
  const maxExplanationLength = 1000;
  const [side, setSide] = useState<"front" | "back">(
    completed ? "back" : "front",
  );
  const [incorrectSound] = useSound("/incorrect.mp3", { volume: 0.5 });
  const [flipSound] = useSound("/flip.mp3", { volume: 0.5 });

  const [loading, setLoading] = useState(false);

  const [correctSound] = useSound("/correct.mp3", { volume: 0.5 });

  const [isFlipped, setIsFlipped] = useState(completed);
  const [submitError, setSubmitError] = useState(false);

  const [correct, setCorrect] = useState<null | boolean>(null);

  const toggleFlip = () => {
    flipSound();
    setIsFlipped(!isFlipped);
    setSide((prev) => (prev === "front" ? "back" : "front"));
  };

  const revealedAnswer = () => {
    if (!completed) {
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
          question,
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
        correctSound();

        toast.success("correct!");
      } else {
        incorrectSound();
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
                  disabled={
                    submitError || loading || userExplanation.length === 0
                  }
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
                    toggleFlip();
                  }}
                >
                  Back to problem
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
