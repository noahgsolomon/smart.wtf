import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schemas/users/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";
import { z } from "zod";

// Helper function to generate a random string of specified length
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
  // Mutation to check if a user exists in the database and create a new user if not
  exists: protectedProcedure.mutation(async ({ ctx }) => {
    const clerkUser = await currentUser();
    if (clerkUser) {
      // Check if the user already exists in the database
      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.clerk_id, clerkUser?.id ?? "some_nonexistent_id"));

      // If the user does not exist, create a new user record
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

  // Mutation to delete a user from the database
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    // Use a transaction to safely delete the user
    await ctx.db.transaction(async (trx) => {
      await trx.delete(users).where(eq(users.id, ctx.user_id));
    });
    return { status: "OK" };
  }),

  // Query to retrieve the current user's details
  user: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.user_id),
    });

    return { user: user };
  }),

  // Mutation to update the current user's username
  setUsername: protectedProcedure
    .input(
      z.object({
        username: z.string().min(3).max(20),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if username is valid
      if (!input.username) {
        return {
          data: null,
          status: "ERROR",
          message: "Username must be at least 3 characters",
        };
      }
      // Check if username already exists
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
      // Update the username
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

  // Mutation to update the current user's name
  setName: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(75),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if name is valid
      if (!input.name) {
        return {
          data: null,
          status: "ERROR",
          message: "name must be at least 3 characters",
        };
      }
      // Update the name
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

  // Mutation to create a Stripe checkout session for the user
  createStripeSession: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user_id;

    const billingUrl = absoluteUrl("/settings/billing");

    // Ensure the userId is available
    if (!userId) {
      throw new Error("No user ID");
    }

    // Retrieve the user from the database
    const dbUser = await ctx.db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!dbUser) {
      throw new Error("No user found");
    }

    const subscriptionPlan = await getUserSubscriptionPlan();

    // If the user is already subscribed and has a Stripe customer ID, create a billing portal session
    if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
      const session = await stripe.billingPortal.sessions.create({
        customer: dbUser.stripeCustomerId,
        return_url: billingUrl,
      });

      return { url: session.url };
    }

    // Otherwise, create a new Stripe checkout session for a subscription
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
