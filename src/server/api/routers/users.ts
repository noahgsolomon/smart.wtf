import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schemas/users/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";

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

  createStripeSession: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user_id;

    const billingUrl = absoluteUrl("/billing");

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
