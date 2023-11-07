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
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Quiz({
  subSection,
  blockId,
  content,
  explanation,
  options,
  answer,
  completed,
  params,
}: {
  subSection: number;
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

  const notify = () => toast.success("correct!");

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

  const form = useForm<z.infer<typeof FormSchema>>();

  const router = useRouter();

  const [side, setSide] = useState<"QUESTION" | "ANSWER">("QUESTION");

  useEffect(() => {
    if (completed) {
      setGuessed((prev) => [...prev, answer]);
    }
  }, [completed, answer]);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    setSide(side === "QUESTION" ? "ANSWER" : "QUESTION");
  };

  const { section, setSection } = useSectionContext();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setGuessed((prev) => {
      if (!prev.includes(data.answer)) {
        return [...prev, data.answer];
      }
      return prev;
    });
    if (data.answer === answer) {
      mutateBlock.mutate({
        blockId,
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

      notify();
      sectionQuery.refetch();
      const currentBlock = section[subSection - 1]?.blocks.find(
        (b) => b.id === blockId,
      );
      const currentBlockOrder = currentBlock?.order ?? 0;

      const totalBlocksInPreviousSections = section
        .slice(0, subSection - 1)
        .reduce(
          (total, currentSection) => total + currentSection.blocks.length,
          0,
        );
      const globalCurrentBlockOrder =
        totalBlocksInPreviousSections + currentBlockOrder;

      console.log("currentBlockOrder", currentBlockOrder);
      console.log(
        "section[subSection - 1]?.blocks.length ?? 0",
        section[subSection - 1]?.blocks.length ?? 0,
      );

      const isNotLastBlockInSubsection =
        currentBlockOrder < (section[subSection - 1]?.blocks.length ?? 0);

      console.log(globalCurrentBlockOrder + 1);

      if (isNotLastBlockInSubsection) {
        setTimeout(() => {
          router.push(`#${globalCurrentBlockOrder + 1}`);
        }, 100);
      }
    }
  }

  return (
    <div className="p-4">
      <div className="card-container">
        <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
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
                      onClick={() => {
                        toggleFlip();
                      }}
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
