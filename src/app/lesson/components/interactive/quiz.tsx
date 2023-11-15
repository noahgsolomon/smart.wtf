"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type ReactElement, useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
  options: string[];
  answer: "ONE" | "TWO" | "THREE" | "FOUR";
  completed?: boolean;
  params: { slug: string; chapter: string; lesson: string };
}) {
  const FormSchema = z.object({
    answer: z.enum(["ONE", "TWO", "THREE", "FOUR"]),
  });

  const correct = () => toast.success("correct!");
  const incorrect = () => toast.error("incorrect!");

  const [guessed, setGuessed] = useState<("ONE" | "TWO" | "THREE" | "FOUR")[]>(
    [],
  );

  const sectionQuery = trpc.course.getCourseSection.useQuery({
    sectionId: parseInt(
      params.lesson && typeof params.lesson === "string" ? params.lesson : "1",
    ),
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const mutateBlock = trpc.course.setBlockCompleted.useMutation();

  const [correctSound] = useSound("/correct.mp3");
  const [incorrectSound] = useSound("/incorrect.mp3");
  const [flipSound] = useSound("/flip.mp3");

  const form = useForm<z.infer<typeof FormSchema>>();

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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setGuessed((prev) => {
      if (!prev.includes(data.answer)) {
        return [...prev, data.answer];
      }
      return prev;
    });
    if (data.answer === answer) {
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-2/3 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="answer"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {options.map((option, index) => {
                              return (
                                <FormItem
                                  key={index}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <RadioGroupItem
                                      disabled={
                                        guessed.includes(
                                          index === 0
                                            ? "ONE"
                                            : index === 1
                                            ? "TWO"
                                            : index === 2
                                            ? "THREE"
                                            : "FOUR",
                                        ) || guessed.includes(answer)
                                      }
                                      correct={
                                        index === 0
                                          ? answer === "ONE" &&
                                            guessed.includes("ONE")
                                          : index === 1
                                          ? answer === "TWO" &&
                                            guessed.includes("TWO")
                                          : index === 2
                                          ? answer === "THREE" &&
                                            guessed.includes("THREE")
                                          : answer === "FOUR" &&
                                            guessed.includes("FOUR")
                                      }
                                      incorrect={
                                        index === 0
                                          ? answer !== "ONE" &&
                                            guessed.includes("ONE")
                                          : index === 1
                                          ? answer !== "TWO" &&
                                            guessed.includes("TWO")
                                          : index === 2
                                          ? answer !== "THREE" &&
                                            guessed.includes("THREE")
                                          : answer !== "FOUR" &&
                                            guessed.includes("FOUR")
                                      }
                                      value={
                                        index === 0
                                          ? "ONE"
                                          : index === 1
                                          ? "TWO"
                                          : index === 2
                                          ? "THREE"
                                          : "FOUR"
                                      }
                                    />
                                  </FormControl>
                                  <FormLabel className="text-lg">
                                    {option}
                                  </FormLabel>
                                </FormItem>
                              );
                            })}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row gap-2 py-6">
                    {!guessed.includes(answer) ? (
                      <Button type="submit">Check</Button>
                    ) : null}
                    <Button
                      type="button"
                      variant={"secondary"}
                      onClick={revealedAnswer}
                    >
                      Show Explanation
                    </Button>
                  </div>
                </form>
              </Form>
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
