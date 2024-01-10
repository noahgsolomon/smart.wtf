"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState, useEffect, type SetStateAction, type Dispatch } from "react";
import useSound from "use-sound";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { type CarouselApi } from "@/components/ui/carousel";

export default function Quiz({
  api,
  index,
  setCompleted,
  content,
  explanation,
  options,
  answer,
  completed,
}: {
  index: number;
  setCompleted: Dispatch<SetStateAction<Record<number, boolean>>>;
  content: string;
  explanation: string;
  options: { order: number; option: string }[];
  answer: number;
  completed?: boolean;
  api: CarouselApi | undefined;
}) {
  const [guessed, setGuessed] = useState<number[]>([]);

  const [isFlipped, setIsFlipped] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<number | null>(null);

  const [correctSound] = useSound("/correct.mp3", { volume: 0.5 });
  const [incorrectSound] = useSound("/incorrect.mp3", { volume: 0.5 });
  const [flipSound] = useSound("/flip.mp3", { volume: 0.5 });
  const [incorrectVal, setIncorrectVal] = useState(false);
  const [correctVal, setCorrectVal] = useState(false);

  const [side, setSide] = useState<"QUESTION" | "ANSWER">("QUESTION");
  const [continueSound] = useSound("/click.mp3", { volume: 0.5 });

  useEffect(() => {
    if (completed) {
      setGuessed((prev) => [...prev, answer]);
    }
  }, [completed, answer]);

  const revealedAnswer = () => {
    if (!completed) {
      setCompleted((prev) => ({ ...prev, [index]: true }));
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
      setCompleted((prev) => ({ ...prev, [index]: true }));
      setCorrectVal(true);
    } else {
      incorrectSound();
      setIncorrectVal(true);
    }
  }

  return (
    <div className="p-4">
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
                  {!completed && !guessed.includes(answer) ? (
                    <Button onClick={() => onSubmit({ guess: currentGuess })}>
                      Check
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
