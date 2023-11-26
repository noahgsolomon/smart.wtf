import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { userThread } from "@/server/db/schemas/ai/schema";
import { Message } from "@/types";
import { eq } from "drizzle-orm";
import { OpenAI } from "openai";
import { z } from "zod";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiRouter = createTRPCRouter({
  getThread: protectedProcedure.query(async ({ ctx }) => {
    const thread = await ctx.db.query.userThread.findFirst({
      where: eq(userThread.userId, ctx.user_id),
    });
    const assistantId = "asst_Z1KwKAyaA4lKWtKEiutE2ORK";

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
    .query(async ({ input, ctx }) => {
      const thread = await client.beta.threads.messages.list(input.threadId, {
        order: "asc",
      });

      const messages: Message[] = [];

      for (const message of thread.data) {
        messages.push({
          role: message.role,
          text:
            message.content[0]?.type === "text"
              ? message.content[0]?.text.value
              : "",
        });
      }

      return { messages };
    }),
});
