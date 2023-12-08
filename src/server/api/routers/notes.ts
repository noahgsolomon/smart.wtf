import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { notes } from "@/server/db/schemas/notes/schema";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const notesRouter = createTRPCRouter({
  createNote: protectedProcedure
    .input(z.object({ title: z.string(), agentId: z.number() }))
    .mutation(async ({ ctx, input: { title, agentId } }) => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          messages: [
            {
              role: "system",
              content: `Evaluate the user's request for a note on the topic: "${title}". Determine whether the topic is appropriate and substantial enough for an academic or educational note. If the topic is inappropriate, offensive, lacks educational value, or is nonsensical, return a JSON object with the attribute 'valid' set to false. If the topic is appropriate and has enough depth for an in-depth exploration of 1,000+ words, return a JSON object with the following attributes: 'valid' (set to true), 'description' (a brief one-sentence description of the topic), 'title' (the suggested title for the note), and 'category' (choose from ENGLISH, MATH, SCIENCE, HISTORY, ARTS, MUSIC, LITERATURE, PHILOSOPHY, GEOGRAPHY, SOCIAL STUDIES, PHYSICAL EDUCATION, COMPUTER SCIENCE, ECONOMICS, BUSINESS STUDIES, PSYCHOLOGY, LAW, POLITICAL SCIENCE, ENVIRONMENTAL SCIENCE, ENGINEERING, MEDICINE, AGRICULTURE, ASTRONOMY).`,
            },
          ],

          response_format: { type: "json_object" },
        });

        const argumentsData = JSON.parse(
          response.choices[0]?.message.content ?? "{}",
        );

        if (!argumentsData.valid) {
          return { valid: false };
        }

        const newNote = await ctx.db.insert(notes).values({
          agent_id: agentId,
          user_id: ctx.user_id,
          title: argumentsData.title,
          category: argumentsData.category,
          description: argumentsData.description,
          markdown: "",
          minutes: 8,
        });

        return { valid: true, noteId: newNote.insertId };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }),

  recommendedNotes: protectedProcedure.query(async ({ ctx }) => {
    const userNotes = await ctx.db.query.notes.findMany({
      where: eq(notes.user_id, ctx.user_id),
      columns: {
        title: true,
      },
    });

    try {
      console.log(userNotes.map((note) => note.title).join(", "));
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
          {
            role: "system",
            content: `Based on the user's previous learning topics, including ${userNotes
              .map((note) => note.title)
              .join(
                ", ",
              )}, generate a list of 2 or 3 new study topics as logical next steps. Return these recommendations in JSON format, with each recommended topic represented as a simple string title under the 'notes' array. Avoid including descriptions or details—only the titles of the topics are required. These recommendations should be distinct, relevant, and suitable for the user's continued educational progression. If the user has no previous learning topics, return a list of 2 or 3 topics about math, science, or history.`,
          },
        ],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0]?.message.content ?? "{}").notes;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }),

  getUserNotes: protectedProcedure.query(async ({ ctx }) => {
    const notesFetch = await ctx.db.query.notes.findMany({
      where: eq(notes.user_id, ctx.user_id),
      with: {
        agents: true,
      },
    });

    return { notes: notesFetch };
  }),

  getUserNotesMeta: protectedProcedure.query(async ({ ctx }) => {
    const notesFetch = await ctx.db.query.notes.findMany({
      where: eq(notes.user_id, ctx.user_id),
      columns: {
        id: true,
        title: true,
      },
      with: {
        agents: {
          columns: {
            pfp: true,
          },
        },
      },
    });

    return { notes: notesFetch };
  }),

  getNote: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const noteFetch = await ctx.db.query.notes.findFirst({
        where: and(eq(notes.id, input.id), eq(notes.user_id, ctx.user_id)),
        with: {
          agents: true,
        },
      });

      if (!noteFetch) {
        throw new Error("Note not found");
      }

      return { note: noteFetch };
    }),

  updateNote: protectedProcedure
    .input(
      z.object({ id: z.number(), markdown: z.string(), agent: z.boolean() }),
    )
    .mutation(async ({ ctx, input: { id, markdown, agent } }) => {
      if (agent) {
        await ctx.db
          .update(notes)
          .set({ agents_markdown: markdown })
          .where(eq(notes.id, id));
      } else {
        await ctx.db.update(notes).set({ markdown }).where(eq(notes.id, id));
      }
    }),

  updateImages: protectedProcedure
    .input(
      z.object({
        images: z.array(
          z.object({ asset: z.string(), searchQuery: z.string() }),
        ),
        markdown: z.string(),
      }),
    )
    .mutation(async ({ input: { images, markdown } }) => {
      if (!images) throw new Error("No images provided");

      let markdownContent = markdown;

      for (const image of images) {
        console.log(image);
        const imageFetch = await fetch(
          `https://www.googleapis.com/customsearch/v1?q=${encodeURI(
            image.searchQuery,
          )}&cx=${process.env.GOOGLE_CX}&searchType=image&key=${
            process.env.GOOGLE_API_KEY
          }&num=1`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        const imageResponse = await imageFetch.json();

        if (!imageResponse.items || imageResponse.items.length === 0) {
          throw new Error("Image not found");
        }

        markdownContent = markdownContent.replace(
          image.asset,
          imageResponse.items[0].link,
        );

        markdownContent = markdownContent.replace(
          image.asset,
          imageResponse.items[0].link,
        );
      }

      return { markdown: markdownContent };
    }),
});
