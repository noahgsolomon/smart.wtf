import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schemas/users/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";

export const userRouter = createTRPCRouter({
  exists: protectedProcedure.mutation(async ({ ctx }) => {
    const clerkUser = await currentUser();
    if (clerkUser) {
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.clerk_id, clerkUser?.id ?? "some_nonexistent_id"));
      if (user.length === 0) {
        await ctx.db.insert(users).values({
          name: clerkUser.firstName + " " + clerkUser.lastName,
          email:
            clerkUser.emailAddresses[0]?.emailAddress ??
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
});