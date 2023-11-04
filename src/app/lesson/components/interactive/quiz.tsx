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
import { type ReactElement, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  answer: z.enum(["ONE", "TWO", "THREE", "FOUR"]),
});

function onSubmit(data: z.infer<typeof FormSchema>) {
  console.log(data.answer);
}

export default function Quiz({
  content,
  explanation,
  options,
  answer,
}: {
  content: ReactElement;
  explanation: ReactElement;
  options: string[];
  answer: "ONE" | "TWO" | "THREE" | "FOUR";
}) {
  console.log(answer);
  const FormSchema = z.object({
    answer: z.enum(["ONE", "TWO", "THREE", "FOUR"]),
  });

  const form = useForm<z.infer<typeof FormSchema>>();

  const [side, setSide] = useState<"QUESTION" | "ANSWER">("QUESTION");

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
                  <Button type="submit">Check</Button>
                  <Button
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
    </div>
  );
}
