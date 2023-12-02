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

export type Message = {
  role: "assistant" | "user";
  text: string;
};

export type NoteCategories =
  | "ENGLISH"
  | "MATH"
  | "SCIENCE"
  | "HISTORY"
  | "ARTS"
  | "MUSIC"
  | "LITERATURE"
  | "PHILOSOPHY"
  | "GEOGRAPHY"
  | "SOCIAL STUDIES"
  | "PHYSICAL EDUCATION"
  | "COMPUTER SCIENCE"
  | "ECONOMICS"
  | "BUSINESS STUDIES"
  | "PSYCHOLOGY"
  | "LAW"
  | "POLITICAL SCIENCE"
  | "ENVIRONMENTAL SCIENCE"
  | "ENGINEERING"
  | "MEDICINE"
  | "AGRICULTURE"
  | "ASTRONOMY";

export type Section = {
  id: number;
  name: string;
  order: number;
  sectionId: number;
  time: number;
  courseChapterSections: {
    order: number;
    id: number;
    courseChapters: {
      order: number;
      id: number;
    };
    course: {
      id: number;
    };
  };
  blocks: {
    id: number;
    subSectionId: number;
    order: number;
    markdown: string;
    interactiveComponents: {
      type: "QUIZ" | "UNDERSTANDING" | "SORTING";
      quizzes: {
        id: number;
        questionMarkdown: string;
        options: { option: string; order: number }[];
        correctOption: number;
        explanationMarkdown: string;
      } | null;
      understanding: {
        id: number;
        questionMarkdown: string;
        explanationMarkdown: string;
      } | null;
      sorting: {
        id: number;
        questionMarkdown: string;
        explanationMarkdown: string;
        options: {
          order: number;
          option: string;
        }[];
      } | null;
    }[];
    userCompletedBlocks: {
      blockId: number;
    }[];
  }[];
};
