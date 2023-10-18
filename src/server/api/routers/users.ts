import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { posts, users } from "@/server/db/schemas/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";
import { other } from "@/server/db/schemas/other/schema";

export const userRouter = createTRPCRouter({
  exists: protectedProcedure.mutation(async ({ ctx }) => {
    const clerkUser = await currentUser();
    if (clerkUser) {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.clerk_id, clerkUser?.id ?? "some_nonexistent_id"));
      console.log("21", user);
      if (user.length === 0) {
        await ctx.db.insert(users).values({
          name: clerkUser.firstName + " " + clerkUser.lastName,
          email:
            clerkUser.emailAddresses[0]?.emailAddress ||
            clerkUser.primaryEmailAddressId + "",
          clerk_id: clerkUser.id,
        });
      }
    }
  }),
  user: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.user_id),
    });

    return { user: user };
  }),
  other: protectedProcedure
    .input(
      z.object({
        junk: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.insert(other).values({
        junk: input.junk,
        user_id: ctx.user_id,
      });

      return { data: input.junk };
    }),
});
