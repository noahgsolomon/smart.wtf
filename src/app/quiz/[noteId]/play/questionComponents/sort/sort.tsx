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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
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
        toast.success("correct!");
        setCompleted((prev) => ({ ...prev, [index]: true }));
      } else {
        incorrectSound();
        toast.error("incorrect!");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="p-4">
      <div className="card-container">
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
                  <Button onClick={() => api?.scrollTo(index + 1)}>
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
