"use client";

import { useState } from "react";
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
import { trpc } from "@/trpc/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SortableItem } from "./sortableitem";
import Markdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import slug from "rehype-slug";

export default function Sort({
  question,
  explanation,
  completed,
  options,
}: {
  question: string;
  explanation: string;
  completed: boolean;
  options: { order: number; option: string }[];
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

  const mutateBlock = trpc.course.setBlockCompleted.useMutation({
    onSuccess: (response) => {
      if (response.data.firstCommitToday) {
        toast(`You're on a ${response.data.streakCount} day streak`, {
          icon: "🔥",
        });
      }
    },
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [correctSound] = useSound("/correct.mp3", { volume: 0.5 });
  const [incorrectSound] = useSound("/incorrect.mp3", { volume: 0.5 });
  const [flipSound] = useSound("/flip.mp3", { volume: 0.5 });
  const [side, setSide] = useState<"QUESTION" | "ANSWER">("QUESTION");
  const [loading, setLoading] = useState(false);

  const toggleFlip = () => {
    flipSound();
    setIsFlipped(!isFlipped);
    setSide(side === "QUESTION" ? "ANSWER" : "QUESTION");
  };

  const revealedAnswer = () => {
    if (!completed) {
    }
    toggleFlip();
  };

  const handleSubmit = () => {
    setLoading(true);
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
    <div className="p-4">
      <div className="card-container">
        <div
          className={`rounded-lg ${
            completed ? "border border-success" : ""
          } card ${isFlipped ? "is-flipped" : ""}`}
        >
          {side === "QUESTION" ? (
            <div className=" front space-y-6">
              <div>
                <h2>
                  <Markdown
                    components={{
                      img: ({ ...props }) => (
                        <Image
                          className="rounded-lg"
                          src={
                            props.src ??
                            "https://images.codefoli.com/smartwtf.png"
                          }
                          alt={props.alt ?? "smartwtf"}
                          priority={true}
                          layout="responsive"
                          width={1792}
                          height={1024}
                        />
                      ),
                    }}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[
                      slug,
                      [
                        rehypeAutolinkHeadings,
                        {
                          behavior: "wrap",
                        },
                      ],
                      rehypeHighlight,
                    ]}
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
                <Button onClick={handleSubmit} disabled={loading || completed}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Check"
                  )}
                </Button>
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
            <div className="back">
              <Markdown
                components={{
                  img: ({ ...props }) => (
                    <Image
                      className="rounded-lg"
                      src={
                        props.src ?? "https://images.codefoli.com/smartwtf.png"
                      }
                      alt={props.alt ?? "smartwtf"}
                      priority={true}
                      layout="responsive"
                      width={1792}
                      height={1024}
                    />
                  ),
                }}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  slug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: "wrap",
                    },
                  ],
                  rehypeHighlight,
                ]}
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
