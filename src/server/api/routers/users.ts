import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schemas/users/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";
import { z } from "zod";
import { instructors } from "@/server/db/schemas/instructors/schema";

function generateRandomString(length: number) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}

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
          email: clerkUser.emailAddresses[0]?.emailAddress ?? clerkUser.id,
          clerk_id: clerkUser.id,
          username:
            clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] ??
            generateRandomString(10),
        });
      }
    }
  }),
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.transaction(async (trx) => {
      await trx.delete(instructors).where(eq(instructors.user_id, ctx.user_id));

      await trx.delete(users).where(eq(users.id, ctx.user_id));
    });
    return { status: "OK" };
  }),
  user: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.user_id),
    });

    return { user: user };
  }),

  setUsername: protectedProcedure
    .input(
      z.object({
        username: z.string().min(3).max(20),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.username) {
        return {
          data: null,
          status: "ERROR",
          message: "Username must be at least 3 characters",
        };
      }
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.username, input.username),
      });
      if (user) {
        return {
          data: null,
          status: "ERROR",
          message: "Username already exists",
        };
      }
      await ctx.db
        .update(users)
        .set({
          username: input.username,
        })
        .where(eq(users.id, ctx.user_id));

      return {
        data: input.username,
        status: "OK",
        message: "username has been changed.",
      };
    }),

  setName: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(75),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.name) {
        return {
          data: null,
          status: "ERROR",
          message: "name must be at least 3 characters",
        };
      }

      await ctx.db
        .update(users)
        .set({
          name: input.name,
        })
        .where(eq(users.id, ctx.user_id));

      return {
        data: input.name,
        status: "OK",
        message: "name has been changed.",
      };
    }),

  createStripeSession: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user_id;

    const billingUrl = absoluteUrl("/settings/billing");

    if (!userId) {
      throw new Error("No user ID");
    }

    const dbUser = await ctx.db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!dbUser) {
      throw new Error("No user found");
    }

    const subscriptionPlan = await getUserSubscriptionPlan();

    if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
      const session = await stripe.billingPortal.sessions.create({
        customer: dbUser.stripeCustomerId,
        return_url: billingUrl,
      });

      return { url: session.url };
    }

    const session = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      line_items: [
        {
          price: PLANS.find((plan) => plan.slug === "pro")?.price.priceIds.test,
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
      },
    });

    return { url: session.url };
  }),
});
