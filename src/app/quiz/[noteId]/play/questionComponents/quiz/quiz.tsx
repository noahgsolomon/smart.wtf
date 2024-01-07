"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import { toast } from "sonner";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function Quiz({
  content,
  explanation,
  options,
  answer,
  completed,
}: {
  content: string;
  explanation: string;
  options: { order: number; option: string }[];
  answer: number;
  completed?: boolean;
}) {
  const correct = () => toast.success("correct!");

  const incorrect = () => toast.error("incorrect!");

  const [guessed, setGuessed] = useState<number[]>([]);

  const [isFlipped, setIsFlipped] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<number | null>(null);

  const [correctSound] = useSound("/correct.mp3", { volume: 0.5 });
  const [incorrectSound] = useSound("/incorrect.mp3", { volume: 0.5 });
  const [flipSound] = useSound("/flip.mp3", { volume: 0.5 });

  const [side, setSide] = useState<"QUESTION" | "ANSWER">("QUESTION");

  useEffect(() => {
    if (completed) {
      setGuessed((prev) => [...prev, answer]);
    }
  }, [completed, answer]);

  const revealedAnswer = () => {
    if (!completed) {
    }
    toggleFlip();
  };

  const toggleFlip = () => {
    flipSound();
    setIsFlipped(!isFlipped);
    setSide(side === "QUESTION" ? "ANSWER" : "QUESTION");
  };

  function onSubmit({ guess }: { guess: number | null }) {
    if (guess === null) {
      return;
    }
    setGuessed((prev) => {
      if (!prev.includes(guess)) {
        return [...prev, guess];
      }
      return prev;
    });
    if (guess === answer) {
      correctSound();
      correct();
    } else {
      incorrectSound();
      incorrect();
    }
  }

  return (
    <div className="p-4">
      <div className="card-container ">
        <div
          className={`rounded-lg border ${
            completed ? "border-success" : "border-border"
          } card ${isFlipped ? "is-flipped" : ""}`}
        >
          {side === "QUESTION" ? (
            <div className="front flex min-h-[300px] flex-col justify-between">
              <div>
                <Markdown
                  className=" prose prose-slate max-w-[250px] dark:prose-invert md:max-w-none"
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {content}
                </Markdown>
              </div>
              <div>
                <RadioGroup className="flex flex-col space-y-1">
                  {options.map((option, index) => {
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <RadioGroupItem
                          onClick={() => setCurrentGuess(index + 1)}
                          disabled={
                            guessed.includes(index + 1) ||
                            guessed.includes(answer)
                          }
                          correct={
                            answer == index + 1 && guessed.includes(index + 1)
                          }
                          incorrect={
                            answer != index + 1 && guessed.includes(index + 1)
                          }
                          value={(index + 1).toString()}
                        />
                        <Markdown
                          className=" prose prose-slate max-w-[250px] text-base dark:prose-invert"
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {option.option}
                        </Markdown>
                      </div>
                    );
                  })}
                </RadioGroup>
                <div className="flex flex-row gap-2 py-6">
                  {!guessed.includes(answer) ? (
                    <Button onClick={() => onSubmit({ guess: currentGuess })}>
                      Check
                    </Button>
                  ) : null}
                  <Button variant={"secondary"} onClick={revealedAnswer}>
                    Show Explanation
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className={`back flex min-h-[300px] flex-col justify-between`}>
              <Markdown
                className="prose prose-slate max-w-[250px] dark:prose-invert md:max-w-none"
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {explanation}
              </Markdown>
              <div className="flex flex-row gap-2 py-6">
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
