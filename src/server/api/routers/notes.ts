import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { notes } from "@/server/db/schemas/notes/schema";

export const notesRouter = createTRPCRouter({
  getUserNotes: protectedProcedure.query(async ({ ctx }) => {
    const notesFetch = await ctx.db.query.notes.findMany({
      where: eq(notes.user_id, ctx.user_id),
      with: {
        agents: true,
      },
    });

    console.log("NOTESSSSSSEIUEWNuiewnfuiewfuweniu ", notesFetch);

    return { notes: notesFetch };
  }),
});
