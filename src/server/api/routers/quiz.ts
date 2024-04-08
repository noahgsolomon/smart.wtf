import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  interactiveComponents,
  quizzes,
  sorting,
  understanding,
} from "@/server/db/schemas/courses/schema";
import { z } from "zod";
import OpenAI from "openai";
import { type Question } from "@/types";
import { db } from "@/server/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const quizRouter = createTRPCRouter({
  getQuestions: publicProcedure
    .input(z.object({ noteId: z.number() }))
    .query(async ({ input: { noteId } }) => {
      const quizQuestions = await db.query.interactiveComponents.findMany({
        where: eq(interactiveComponents.noteId, noteId),
        with: {
          quizzes: true,
          understanding: true,
          sorting: true,
        },
      });
      if (quizQuestions.length === 0) {
        return { available: false };
      }

      return { available: true, questions: quizQuestions };
    }),
  isQuizAvailable: publicProcedure
    .input(z.object({ noteId: z.number() }))
    .query(async ({ input }) => {
      const quizQuestions = await db.query.interactiveComponents.findMany({
        where: eq(interactiveComponents.noteId, input.noteId),
      });
      if (quizQuestions.length === 0) {
        return { available: false };
      }

      return { available: true, questions: quizQuestions };
    }),

  generateQuiz: protectedProcedure
    .input(z.object({ noteId: z.number(), noteTitle: z.string() }))
    .mutation(async ({ ctx, input: { noteId, noteTitle } }) => {
      const generatedQuiz = await generateQuiz(noteTitle);
      if (!generatedQuiz) {
        return;
      }
      const generatedQuestions = JSON.parse(generatedQuiz);

      for (const question of generatedQuestions) {
        if (question.quiz) {
          console.log("quiz", question.quiz);
          const [quizId] = await ctx.db
            .insert(quizzes)
            .values({
              questionMarkdown: question.quiz.questionMarkdown,
              options: question.quiz.options,
              correctOption: question.quiz.correctOption,
              explanationMarkdown: question.quiz.explanationMarkdown,
            })
            .execute();
          await ctx.db.insert(interactiveComponents).values({
            noteId,
            type: "QUIZ",
            quizId: quizId.insertId,
          });
        }
        if (question.understanding) {
          console.log("understanding", question.understanding);
          const [understandingId] = await ctx.db
            .insert(understanding)
            .values({
              questionMarkdown: question.understanding.questionMarkdown,
              explanationMarkdown: question.understanding.explanationMarkdown,
            })
            .execute();
          await ctx.db.insert(interactiveComponents).values({
            noteId,
            type: "UNDERSTANDING",
            understandingId: understandingId.insertId,
          });
        }
        if (question.sorting) {
          const [sortingId] = await ctx.db
            .insert(sorting)
            .values({
              questionMarkdown: question.sorting.questionMarkdown,
              options: question.sorting.options,
              explanationMarkdown: question.sorting.explanationMarkdown,
            })
            .execute();
          await ctx.db.insert(interactiveComponents).values({
            noteId,
            type: "SORTING",
            sortingId: sortingId.insertId,
          });
        }
      }
    }),
});

const generateQuiz = async (note: string) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Generate a series of questions on the topic "${note}". The questions should be a mix of understanding, quiz, and sorting types. For 'understanding' questions, provide a question that assesses comprehension of the topic. For 'quiz' questions, offer multiple-choice questions related to the topic with a correct option. For 'sorting' questions, create statements that need to be arranged in a logical or sequential order. Ensure that each question is accompanied by its markdown-formatted text and any necessary options or answers for evaluation. The questions function must be called and should contain a mix of quiz, understanding, and sorting questions. It should be 4 questions total.
          
          For mathematical expressions and code blocks, use appropriate markdown formatting. For example, for math we use RehypeKaTeX, and here are some math examples:

        - Simple expression: $$x$$ renders as x.
        - Power notation: $$x^2$$ renders as x^2.
        - Function with multiple variables: $$f(x, y, z)$$ renders as f(x, y, z).
        - Partial derivatives: $$\\frac{\\partial^2 f}{\\partial x \\partial y}$$ renders as \\frac{\\partial^2 f}{\\partial x \\partial y}.
        - Summation: $$\\sum_{i=1}^{n} i^2$$ renders as \\sum_{i=1}^{n} i^2.

        NOTE: In the examples above, I have used two backslashes where you see one. This is important because of the way strings resolve backslashes in JavaScript, requiring two backslashes to get one backslash in the string.
        
        REMEMBER, YOU MUST GENERATE 4 DIFFERENT QUESTIONS! NO MORE, NO LESS.`,
        },
      ],
      functions: [
        {
          name: "questions",
          description: `Generates a list of questions which each can be either a quiz, understanding, or a sorting question.`,
          parameters: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    quiz: {
                      type: "object",
                      properties: {
                        correctOption: { type: "number" },
                        questionMarkdown: { type: "string" },
                        explanationMarkdown: { type: "string" },
                        options: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              order: { type: "number" },
                              option: { type: "string" },
                            },
                          },
                        },
                      },
                      required: [
                        "correctOption",
                        "questionMarkdown",
                        "explanationMarkdown",
                        "options",
                      ],
                    },
                    understanding: {
                      type: "object",
                      properties: {
                        questionMarkdown: { type: "string" },
                        explanationMarkdown: { type: "string" },
                      },
                      required: ["explanationMarkdown", "questionMarkdown"],
                    },
                    sorting: {
                      type: "object",
                      properties: {
                        questionMarkdown: { type: "string" },
                        explanationMarkdown: { type: "string" },
                        options: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              order: { type: "number" },
                              option: { type: "string" },
                            },
                          },
                        },
                      },
                      required: [
                        "options",
                        "order",
                        "questionMarkdown",
                        "explainationMarkdown",
                      ],
                    },
                  },
                },
              },
            },
            required: ["quiz", "understanding", "sorting"],
          },
        },
      ],
      function_call: { name: "questions" },
      model: "gpt-4-1106-preview",
    });

    const responseBody = await JSON.parse(
      completion.choices[0]?.message.function_call?.arguments!,
    );

    if (!isQuestion(responseBody.questions)) {
      await generateQuiz(note);
      return;
    }

    // for (const question of responseBody.questions) {
    //   if (question.quiz) {
    //     console.log("quiz", question.quiz);
    //   }
    //   if (question.understanding) {
    //     console.log("understanding", question.understanding);
    //   }
    //   if (question.sorting) {
    //     console.log("sorting", question.sorting);
    //   }
    // }

    return JSON.stringify(responseBody.questions);
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    return;
  }
};

function isQuestion(obj: any): obj is Question {
  console.log(obj.length);
  if (!Array.isArray(obj) || obj.length !== 4) {
    return false;
  }

  return obj.every((element) => {
    return (
      "quiz" in element || "understanding" in element || "sorting" in element
    );
  });
}
