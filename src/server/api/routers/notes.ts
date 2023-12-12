import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { notes } from "@/server/db/schemas/notes/schema";
import { z } from "zod";
import OpenAI from "openai";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 300;

export const notesRouter = createTRPCRouter({
  createImage: protectedProcedure
    .input(z.object({ title: z.string(), id: z.number() }))
    .mutation(async ({ ctx, input: { title, id } }) => {
      const imagePrompt = async (title: string) => {
        try {
          const response = await openai.chat.completions.create({
            model: "ft:gpt-3.5-turbo-1106:personal::8TEhcfKm",
            messages: [
              {
                role: "user",
                content: title,
              },
            ],
          });

          return response.choices[0]?.message.content;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const imageGeneration = async (prompt: string) => {
        const detailed8BitPreface =
          "Create an image in a detailed retro 8-bit style. The artwork should have a pixelated texture and should have vibrant coloring and scenery.";

        const fullPrompt = `${detailed8BitPreface} ${prompt} Remember, this is in retro 8-bit style`;

        const responseFetch = await openai.images.generate({
          model: "dall-e-3",
          prompt: fullPrompt,
          n: 1,
          size: "1792x1024",
          quality: "hd",
          style: "vivid",
          response_format: "url",
          user: "user-1234",
        });

        return responseFetch.data[0]?.url;
      };

      const imageUrl = await imageGeneration((await imagePrompt(title)) ?? "");

      if (!imageUrl) {
        throw new Error("Image URL not found in response");
      }

      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error("Failed to fetch image from URL");
      }

      const arrayBuffer = await imageResponse.arrayBuffer();
      const imageData = Buffer.from(arrayBuffer);

      const s3Client = new S3Client({ region: "us-east-1" });

      const s3Response = await s3Client.send(
        new PutObjectCommand({
          Bucket: "smartimagebucket",
          Key: `note-${id}-image.png`,
          Body: imageData,
          ContentType: "image/png",
        }),
      );

      console.log(s3Response);

      await ctx.db
        .update(notes)
        .set({
          imageUrl: `https://images.smart.wtf/note-${id}-image.png`,
        })
        .where(eq(notes.id, id));

      return { imageUrl };
    }),

  createNote: protectedProcedure
    .input(z.object({ title: z.string(), agentId: z.number() }))
    .mutation(async ({ ctx, input: { title, agentId } }) => {
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo-1106",
          messages: [
            {
              role: "system",
              content: `Assess the user's request for an academic or educational note on the topic '${title}'. Verify if the topic is suitable for an educational context. The criteria for a valid topic include appropriateness, educational value, and the potential for an in-depth exploration of at least 1,000 words. If the topic fails to meet these criteria (i.e., it is inappropriate, offensive, lacks educational value, or is nonsensical), return a JSON object with 'valid': false. For valid topics, return a JSON object with 'valid': true, a concise 'description' of the topic, the 'title' of the topic, and the appropriate 'category'. The category must be one of the following: ENGLISH, MATH, SCIENCE, HISTORY, ARTS, MUSIC, LITERATURE, PHILOSOPHY, GEOGRAPHY, SOCIAL STUDIES, PHYSICAL EDUCATION, COMPUTER SCIENCE, ECONOMICS, BUSINESS STUDIES, PSYCHOLOGY, LAW, POLITICAL SCIENCE, ENVIRONMENTAL SCIENCE, ENGINEERING, MEDICINE, AGRICULTURE, ASTRONOMY. Ensure the category is an exact match from these options.`,
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
