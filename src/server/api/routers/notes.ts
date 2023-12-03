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
      console.log("hereeee");
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
});
