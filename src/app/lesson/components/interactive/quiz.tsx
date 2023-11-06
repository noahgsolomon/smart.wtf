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
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";

export default function Quiz({
  blockId,
  content,
  explanation,
  options,
  answer,
  completed,
  params,
}: {
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

  const { toast } = useToast();

  const [guessed, setGuessed] = useState<("ONE" | "TWO" | "THREE" | "FOUR")[]>(
    [],
  );

  const sectionQuery = trpc.course.getCourseSection.useQuery({
    sectionId: parseInt(
      params.lesson && typeof params.lesson === "string" ? params.lesson : "1",
    ),
  });

  const mutateBlock = trpc.course.setBlockCompleted.useMutation();

  const form = useForm<z.infer<typeof FormSchema>>();
  const router = useRouter();

  const [side, setSide] = useState<"QUESTION" | "ANSWER">("QUESTION");

  useEffect(() => {
    if (completed) {
      setGuessed((prev) => [...prev, answer]);
    }
  }, [completed, answer]);

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
      sectionQuery.remove();
      sectionQuery.refetch();
      toast({
        title: "Correct",
        description: "You got it right!",
      });
    }
  }

  return (
    <div className="p-4">
      <div className="rounded-lg border border-border px-4 py-0">
        {side === "QUESTION" ? (
          <>
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
                      setSide("ANSWER");
                    }}
                  >
                    Show Explanation
                  </Button>
                </div>
              </form>
            </Form>
          </>
        ) : (
          <div>
            {explanation}
            <div className="flex flex-row gap-2 py-6">
              <Button
                variant={"secondary"}
                onClick={() => {
                  setSide("QUESTION");
                }}
              >
                Back to problem
              </Button>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}
