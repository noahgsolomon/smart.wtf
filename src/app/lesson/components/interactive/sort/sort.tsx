"use client";

import { ReactNode, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortableitem";
import { Button } from "@/components/ui/button";
import useSound from "use-sound";
import { trpc } from "@/trpc/client";
import toast from "react-hot-toast";
import { useSectionContext } from "@/app/lesson/sectioncontext";
import { Loader2 } from "lucide-react";

export default function Sort({
  chapterId,
  chapterOrder,
  sectionOrder,
  question,
  subSection,
  sectionId,
  blockOrder,
  blockId,
  questionString,
  explanation,
  completed,
  params,
  options,
}: {
  chapterId: number;
  chapterOrder: number;
  sectionOrder: number;
  blockId: number;
  blockOrder: number;
  sectionId: number;
  subSection: number;
  question: ReactNode;
  questionString: string;
  explanation: ReactNode;
  explanationString: string;
  completed: boolean;
  params: { slug: string; chapter: string; lesson: string };
  options: string[];
}) {
  const [randomOrderedOptions, setRandomOrderedOptions] = useState(
    options.sort(() => Math.random() - 0.5),
  );
  console.log(options);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const mutateBlock = trpc.course.setBlockCompleted.useMutation({
    onSuccess: (response) => {
      console.log("successss");
      if (response.data.firstCommitToday) {
        toast(`You're on a ${response.data.streakCount} day streak`, {
          icon: "🔥",
          style: {
            borderRadius: "var(--radius)",
            background: "hsl(var(--toast))",
            color: "hsl(var(--primary))",
          },
        });
      }
    },
  });

  const { section, setSection } = useSectionContext();
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
      mutateBlock.mutate({
        blockId,
        courseId: section[0]?.courseChapterSections.course.id!,
        blockOrder,
        sectionId,
        subSectionId: section[subSection - 1]?.id!,
        subSectionOrder: subSection,
        chapterId,
        chapterOrder,
        sectionOrder,
        slug: params.slug,
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
    }
    toggleFlip();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(randomOrderedOptions === options);
      console.log(randomOrderedOptions);
      console.log(options);
      if (randomOrderedOptions === options) {
        correctSound();

        mutateBlock.mutate({
          blockId,
          courseId: section[0]?.courseChapterSections.course.id!,
          blockOrder,
          sectionId,
          subSectionId: section[subSection - 1]?.id!,
          subSectionOrder: subSection,
          chapterId,
          chapterOrder,
          sectionOrder,
          slug: params.slug,
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

        toast.success("correct!", {
          style: {
            borderRadius: "var(--radius)",
            background: "hsl(var(--toast))",
            color: "hsl(var(--primary))",
          },
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
      } else {
        incorrectSound();
        toast.error("incorrect!", {
          style: {
            borderRadius: "var(--radius)",
            background: "hsl(var(--toast))",
            color: "hsl(var(--primary))",
          },
        });
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
                <h2>{question}</h2>
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
                          key={option}
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
              {explanation}
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

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setRandomOrderedOptions((option) => {
        const oldIndex = option.indexOf(active.id);
        const newIndex = option.indexOf(over.id);

        return arrayMove(option, oldIndex, newIndex);
      });
    }
  }
}
