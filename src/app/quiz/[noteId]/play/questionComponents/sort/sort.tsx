"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import useSound from "use-sound";
import { SortableItem } from "./sortableitem";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { CarouselApi } from "@/components/ui/carousel";

export default function Sort({
  api,
  index,
  setCompleted,
  question,
  explanation,
  completed,
  options,
}: {
  index: number;
  setCompleted: Dispatch<SetStateAction<Record<number, boolean>>>;
  question: string;
  explanation: string;
  completed: boolean;
  options: { order: number; option: string }[];
  api: CarouselApi | undefined;
}) {
  const [randomOrderedOptions, setRandomOrderedOptions] = useState(() => {
    const shuffledOptions: string[] = [
      ...options.map((option) => option.option),
    ];

    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [
        shuffledOptions[j]!,
        shuffledOptions[i]!,
      ];
    }

    return shuffledOptions;
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [isFlipped, setIsFlipped] = useState(false);
  const [correctSound] = useSound("/correct.mp3", { volume: 0.5 });
  const [incorrectSound] = useSound("/incorrect.mp3", { volume: 0.5 });
  const [flipSound] = useSound("/flip.mp3", { volume: 0.5 });
  const [side, setSide] = useState<"QUESTION" | "ANSWER">("QUESTION");
  const [continueSound] = useSound("/click.mp3", { volume: 0.5 });
  const [incorrectVal, setIncorrectVal] = useState(false);
  const [correctVal, setCorrectVal] = useState(false);

  const toggleFlip = () => {
    flipSound();
    setIsFlipped(!isFlipped);
    setSide(side === "QUESTION" ? "ANSWER" : "QUESTION");
  };

  const revealedAnswer = () => {
    if (!completed) {
      setCompleted((prev) => ({ ...prev, [index]: true }));
    }
    toggleFlip();
  };

  const handleSubmit = () => {
    try {
      if (
        randomOrderedOptions.join("") ===
        options
          .sort((a, b) => a.order - b.order)
          .map((option) => option.option)
          .join("")
      ) {
        correctSound();
        setCompleted((prev) => ({ ...prev, [index]: true }));
        setCorrectVal(true);
      } else {
        incorrectSound();
        setIncorrectVal(true);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

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
          className={` card rounded-lg border ${isFlipped ? "is-flipped" : ""}`}
        >
          {side === "QUESTION" ? (
            <div className="front flex min-h-[300px] flex-col justify-between">
              <div>
                <h2>
                  <Markdown
                    className="prose prose-slate max-w-[250px] dark:prose-invert md:max-w-none"
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {question}
                  </Markdown>
                </h2>
              </div>
              <div>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    disabled={completed}
                    items={randomOrderedOptions}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="flex flex-col gap-2">
                      {randomOrderedOptions.map((option, index) => (
                        <SortableItem
                          order={index + 1}
                          key={index}
                          option={option}
                          completed={completed}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
              <div className="flex flex-row gap-2">
                {!completed ? (
                  <Button onClick={handleSubmit}>Check</Button>
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
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={revealedAnswer}
                >
                  Show Explanation
                </Button>
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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setRandomOrderedOptions((option) => {
        const oldIndex = option.indexOf(active?.id + "");
        const newIndex = option.indexOf(over?.id + "");

        return arrayMove(option, oldIndex, newIndex);
      });
    }
  }
}
