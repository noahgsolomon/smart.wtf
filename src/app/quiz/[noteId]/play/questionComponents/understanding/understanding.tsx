"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lightbulb, Loader2 } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import useSound from "use-sound";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { type CarouselApi } from "@/components/ui/carousel";

export default function Understanding({
  index,
  setCompleted,
  question,
  explanation,
  completed,
  api,
}: {
  index: number;
  setCompleted: Dispatch<SetStateAction<Record<number, boolean>>>;
  question: string;
  explanation: string;
  completed: boolean;
  api: CarouselApi | undefined;
}) {
  const [userExplanation, setUserExplanation] = useState("");
  const maxExplanationLength = 1000;
  const [side, setSide] = useState<"front" | "back">("front");
  const [incorrectSound] = useSound("/incorrect.mp3", { volume: 0.5 });
  const [flipSound] = useSound("/flip.mp3", { volume: 0.5 });

  const [loading, setLoading] = useState(false);

  const [correctSound] = useSound("/correct.mp3", { volume: 0.5 });

  const [isFlipped, setIsFlipped] = useState(completed);
  const [submitError, setSubmitError] = useState(false);

  const [continueSound] = useSound("/click.mp3", { volume: 0.5 });
  const [incorrectVal, setIncorrectVal] = useState(false);
  const [correctVal, setCorrectVal] = useState(false);

  const toggleFlip = () => {
    flipSound();
    setIsFlipped(!isFlipped);
    setSide((prev) => (prev === "front" ? "back" : "front"));
  };

  const revealedAnswer = () => {
    if (!completed) {
      setCompleted((prev) => ({ ...prev, [index]: true }));
    }
    toggleFlip();
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (userExplanation.length === 0) {
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
      if (dataBody.correct) {
        correctSound();
        setCompleted((prev) => ({ ...prev, [index]: true }));
        setCorrectVal(true);
      } else {
        incorrectSound();
        setIncorrectVal(true);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
      <div className="card-container relative">
        <div
          style={{
            width: "100%",
            maxWidth: "640px",
            backgroundImage: `radial-gradient(at 27% 37%, hsla(0, 50%, 50%, 1) 0px, transparent 50%),
                      radial-gradient(at 97% 21%, hsla(5, 50%, 60%, 1) 0px, transparent 50%),
                      radial-gradient(at 52% 99%, hsla(10, 50%, 55%, 1) 0px, transparent 50%),
                      radial-gradient(at 10% 29%, hsla(15, 50%, 65%, 1) 0px, transparent 50%),
                      radial-gradient(at 97% 96%, hsla(20, 50%, 70%, 1) 0px, transparent 50%),
                      radial-gradient(at 33% 50%, hsla(25, 50%, 75%, 1) 0px, transparent 50%),
                      radial-gradient(at 79% 53%, hsla(30, 50%, 80%, 1) 0px, transparent 50%)`,
            position: "absolute",
            height: "100%",
            filter: "blur(100px) saturate(150%)",
            top: "80px",
            opacity: 0.15,
          }}
          className={`absolute bottom-0 left-0 right-0 top-0 transition-all ${
            incorrectVal && !correctVal ? "" : "hidden opacity-0"
          }`}
        ></div>
        <div
          style={{
            width: "100%",
            maxWidth: "640px",
            backgroundImage: `radial-gradient(at 27% 37%, hsla(90, 50%, 50%, 1) 0px, transparent 50%),
                      radial-gradient(at 97% 21%, hsla(100, 50%, 60%, 1) 0px, transparent 50%),
                      radial-gradient(at 52% 99%, hsla(110, 50%, 55%, 1) 0px, transparent 50%),
                      radial-gradient(at 10% 29%, hsla(120, 50%, 65%, 1) 0px, transparent 50%),
                      radial-gradient(at 97% 96%, hsla(130, 50%, 70%, 1) 0px, transparent 50%),
                      radial-gradient(at 33% 50%, hsla(140, 50%, 75%, 1) 0px, transparent 50%),
                      radial-gradient(at 79% 53%, hsla(150, 50%, 80%, 1) 0px, transparent 50%)`,
            position: "absolute",
            height: "100%",
            filter: "blur(100px) saturate(150%)",
            top: "80px",
            opacity: 0.15,
          }}
          className={`absolute bottom-0 left-0 right-0 top-0 transition-all ${
            correctVal ? "" : "hidden opacity-0"
          }`}
        ></div>
        <div
          className={`card rounded-lg border ${isFlipped ? "is-flipped" : ""}`}
        >
          {side === "front" ? (
            <div className="front flex min-h-[300px] flex-col justify-between">
              <Markdown
                className="prose prose-slate max-w-[250px] dark:prose-invert md:max-w-none"
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {question}
              </Markdown>
              <div className="relative">
                <Textarea
                  disabled={completed}
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
              <div>
                {!completed ? (
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
                      "Check"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      continueSound();
                      api?.scrollTo(index + 1);
                    }}
                  >
                    Continue
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="back flex min-h-[300px] flex-col justify-between">
              <Markdown
                className="prose prose-slate max-w-[250px] dark:prose-invert md:max-w-none"
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {explanation}
              </Markdown>

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
