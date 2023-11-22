"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import { type ReactElement, useState, useEffect } from "react";
import { trpc } from "@/trpc/client";
import { useSectionContext } from "../../sectioncontext";
import toast, { Toaster } from "react-hot-toast";
import useSound from "use-sound";

export default function Quiz({
  chapterId,
  chapterOrder,
  sectionOrder,
  sectionId,
  subSection,
  blockOrder,
  blockId,
  content,
  explanation,
  options,
  answer,
  completed,
  params,
}: {
  chapterId: number;
  chapterOrder: number;
  sectionOrder: number;
  sectionId: number;
  subSection: number;
  blockOrder: number;
  blockId: number;
  content: ReactElement;
  explanation: ReactElement;
  options: { order: number; option: string }[];
  answer: number;
  completed?: boolean;
  params: { slug: string; chapter: string; lesson: string };
}) {
  const correct = () =>
    toast.success("correct!", {
      style: {
        borderRadius: "var(--radius)",
        background: "hsl(var(--toast))",
        color: "hsl(var(--primary))",
      },
    });

  const incorrect = () =>
    toast.error("incorrect!", {
      style: {
        borderRadius: "var(--radius)",
        background: "hsl(var(--toast))",
        color: "hsl(var(--primary))",
      },
    });

  const [guessed, setGuessed] = useState<number[]>([]);

  const sectionQuery = trpc.course.getCourseSection.useQuery({
    sectionId: parseInt(
      params.lesson && typeof params.lesson === "string" ? params.lesson : "1",
    ),
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [currentGuess, setCurrentGuess] = useState<number | null>(null);

  const mutateBlock = trpc.course.setBlockCompleted.useMutation({
    onSuccess: (response) => {
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

  const [correctSound] = useSound("/correct.mp3", { volume: 0.5 });
  const [incorrectSound] = useSound("/incorrect.mp3", { volume: 0.5 });
  const [flipSound] = useSound("/flip.mp3", { volume: 0.5 });

  const [side, setSide] = useState<"QUESTION" | "ANSWER">("QUESTION");

  const { section, setSection } = useSectionContext();

  useEffect(() => {
    if (completed) {
      setGuessed((prev) => [...prev, answer]);
    }
  }, [completed, answer]);

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

      correct();
      sectionQuery.refetch();
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
      incorrect();
    }
  }

  return (
    <div className="p-4">
      <div className="card-container">
        <div
          className={`rounded-lg border ${
            completed ? "border-success" : "border-border"
          } card ${isFlipped ? "is-flipped" : ""}`}
        >
          {side === "QUESTION" ? (
            <div className="front">
              <div>{content}</div>
              <div>
                <div className="w-2/3 space-y-6">
                  <div>
                    <div className="space-y-3">
                      <div>
                        <RadioGroup className="flex flex-col space-y-1">
                          {options.map((option, index) => {
                            return (
                              <div
                                key={index}
                                className="flex items-center space-x-3"
                              >
                                <div>
                                  <RadioGroupItem
                                    onClick={() => setCurrentGuess(index + 1)}
                                    disabled={
                                      guessed.includes(index + 1) ||
                                      guessed.includes(answer)
                                    }
                                    correct={
                                      answer == index + 1 &&
                                      guessed.includes(index + 1)
                                    }
                                    incorrect={
                                      answer != index + 1 &&
                                      guessed.includes(index + 1)
                                    }
                                    value={(index + 1).toString()}
                                  />
                                </div>
                                <div className="text-lg">{option.option}</div>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </div>
                      <div />
                    </div>
                  </div>
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
      <Toaster />
    </div>
  );
}
