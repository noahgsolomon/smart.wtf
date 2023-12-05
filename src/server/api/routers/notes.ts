import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { notes } from "@/server/db/schemas/notes/schema";
import { z } from "zod";

export const notesRouter = createTRPCRouter({
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
    .input(z.object({ id: z.number(), markdown: z.string() }))
    .mutation(async ({ ctx, input: { id, markdown } }) => {
      await ctx.db.update(notes).set({ markdown }).where(eq(notes.id, id));
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
    .mutation(async ({ ctx, input: { images, markdown } }) => {
      if (!images) throw new Error("No images provided");

      let markdownContent = markdown;

      for (const image of images) {
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
          console.log(imageResponse);
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
