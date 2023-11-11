import { type User } from "@clerk/nextjs/dist/types/server";

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: Date;
    subscribed: boolean;
  };

export type Section = {
  id: number;
  name: string;
  order: number;
  sectionId: number;
  time: number;
  blocks: {
    id: number;
    subSectionId: number;
    order: number;
    markdown: string;
    interactiveComponents: {
      type: "QUIZ" | "UNDERSTANDING";
      quizzes: {
        id: number;
        questionMarkdown: string;
        optionOne: string;
        optionTwo: string;
        optionThree: string;
        optionFour: string;
        correctOption: "ONE" | "TWO" | "THREE" | "FOUR";
        explanationMarkdown: string;
      } | null;
      understanding: {
        id: number;
        questionMarkdown: string;
        explanationMarkdown: string;
      } | null;
    }[];
    userCompletedBlocks: {
      blockId: number;
    }[];
  }[];
};
