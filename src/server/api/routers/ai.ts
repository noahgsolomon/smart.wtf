import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { userThread } from "@/server/db/schemas/ai/schema";
import { type Message } from "@/types";
import { eq } from "drizzle-orm";
import { OpenAI } from "openai";
import { z } from "zod";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const assistantId = "asst_Z1KwKAyaA4lKWtKEiutE2ORK";

export const aiRouter = createTRPCRouter({
  newThread: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.delete(userThread).where(eq(userThread.userId, ctx.user_id));

    const thread = await client.beta.threads.create({});

    await ctx.db.insert(userThread).values({
      userId: ctx.user_id,
      threadId: thread.id,
      assistantId,
    });

    return { threadId: thread.id, assistantId };
  }),
  getThread: protectedProcedure.query(async ({ ctx }) => {
    const thread = await ctx.db.query.userThread.findFirst({
      where: eq(userThread.userId, ctx.user_id),
    });

    if (!thread) {
      const thread = await client.beta.threads.create({});

      await ctx.db.insert(userThread).values({
        userId: ctx.user_id,
        threadId: thread.id,
        assistantId,
      });

      return { threadId: thread.id, assistantId };
    }
    return { threadId: thread.threadId, assistantId: thread.assistantId };
  }),
  getMessages: protectedProcedure
    .input(
      z.object({
        threadId: z.string(),
        assistantId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const thread = await client.beta.threads.messages.list(input.threadId, {
        order: "desc",
      });

      // await client.beta.threads.runs.cancel(
      //   input.threadId,
      //   "run_bcMVNJXVlWUQL1FrACptzdHf",
      // );

      const messages: Message[] = [];

      console.log(thread);

      for (const message of thread.data) {
        messages.push({
          role: message.role,
          text:
            message.content[0]?.type === "text"
              ? message.content[0]?.text.value
              : "",
        });
      }

      messages.reverse();

      return { messages };
    }),

  sendMessage: protectedProcedure
    .input(
      z.object({
        threadId: z.string(),
        assistantId: z.string(),
        text: z.string(),
        lesson: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await client.beta.threads.messages.create(input.threadId, {
        content: input.text,
        role: "user",
      });

      let run = await client.beta.threads.runs.create(input.threadId, {
        assistant_id: input.assistantId,
      });

      while (run.status !== "completed") {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        run = await client.beta.threads.runs.retrieve(input.threadId, run.id);
        console.log(run);
        if (run.status === "requires_action") {
          console.log("Run requires action:", run);

          if (run.required_action?.type === "submit_tool_outputs") {
            console.log(
              "Required action is submit_tool_outputs:",
              run.required_action,
            );

            const functionName =
              run.required_action.submit_tool_outputs.tool_calls[0]?.function
                .name;
            console.log("Function name of the first tool call:", functionName);

            if (functionName === "get_lesson") {
              const toolCallId =
                run.required_action.submit_tool_outputs.tool_calls[0]?.id;
              console.log("Tool Call ID:", toolCallId);

              const tool_outputs = [
                {
                  tool_call_id: toolCallId,
                  output: input.lesson,
                },
              ];
              console.log(
                "Prepared tool_outputs for submission:",
                tool_outputs,
              );

              try {
                await client.beta.threads.runs.submitToolOutputs(
                  input.threadId,
                  run.id,
                  { tool_outputs },
                );
                console.log("Tool outputs submitted successfully");
              } catch (error) {
                console.error("Error submitting tool outputs:", error);
              }
            } else {
              console.log("Function name does not match 'get_lesson'");
            }
          } else {
            console.log(
              "Run required action type is not 'submit_tool_outputs'",
              run.required_action?.type,
            );
          }
        } else {
          console.log("Run status is not 'requires_action'", run.status);
        }
      }

      const runStep = await client.beta.threads.runs.steps.list(
        input.threadId,
        run.id,

        {
          order: "asc",
        },
      );

      const messages: Message[] = [];

      for (const step of runStep.data) {
        if (step.step_details.type === "message_creation") {
          const message = await client.beta.threads.messages.retrieve(
            input.threadId,
            step.step_details.message_creation.message_id,
          );
          messages.push({
            role: "assistant",
            text:
              message.content[0]?.type === "text"
                ? message.content[0]?.text.value
                : "",
          });
        }
      }

      return {
        messages,
      };
    }),
});
