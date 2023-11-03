import {
  int,
  mysqlTable,
  text,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { users } from "../users/schema";

export const courses = mysqlTable(
  "courses",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 200 }).notNull(),
    description: varchar("description", { length: 500 }).notNull(),
    instructorId: int("instructor_id").notNull(),
    imageUrl: varchar("image_url", { length: 100 }).notNull(),
    difficulty: varchar("difficulty", {
      length: 25,
      enum: ["EASY", "MEDIUM", "HARD"],
    })
      .notNull()
      .default("EASY"),
    slug: varchar("slug", { length: 100 }).notNull().default("").unique(),
    chapters: int("chapters").notNull().default(0),
  },
  (t) => ({
    slugIdx: uniqueIndex("slug_idx").on(t.slug),
  }),
);

export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  courseLikes: many(courseLikes),

  courseChapters: many(courseChapters),
}));

export const courseLikes = mysqlTable(
  "course_likes",
  {
    id: int("id").primaryKey().autoincrement(),
    courseId: int("course_id").notNull(),
    userId: int("user_id").notNull(),
  },
  (t) => ({
    unq: unique().on(t.userId, t.courseId),
  }),
);

export const courseLikesRelations = relations(courseLikes, ({ one }) => ({
  users: one(users, {
    fields: [courseLikes.userId],
    references: [users.id],
  }),

  courses: one(courses, {
    fields: [courseLikes.courseId],
    references: [courses.id],
  }),
}));

export const courseChapters = mysqlTable("course_chapters", {
  id: int("id").primaryKey().autoincrement(),
  courseId: int("course_id").notNull(),
  order: int("order").notNull(),
  name: varchar("name", { length: 200 }).notNull(),
});

export const courseChaptersRelations = relations(
  courseChapters,
  ({ one, many }) => ({
    courses: one(courses, {
      fields: [courseChapters.courseId],
      references: [courses.id],
    }),

    courseChapterSections: many(courseChapterSections),
  }),
);

export const courseChapterSections = mysqlTable("course_chapter_sections", {
  id: int("id").primaryKey().autoincrement(),
  chapterId: int("chapter_id").notNull(),
  order: int("order").notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  description: varchar("description", { length: 500 }).notNull(),
  imageUrl: varchar("image_url", { length: 200 }).notNull(),
});

export const courseChapterSectionsRelations = relations(
  courseChapterSections,
  ({ one, many }) => ({
    courseChapters: one(courseChapters, {
      fields: [courseChapterSections.chapterId],
      references: [courseChapters.id],
    }),
    subSections: many(subSections),
  }),
);

export const subSections = mysqlTable(
  "sub_sections",
  {
    id: int("id").primaryKey().autoincrement(),
    sectionId: int("section_id").notNull(),
    order: int("order").notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    time: int("time").notNull(),
  },
  (t) => ({
    unq: unique().on(t.sectionId, t.order),
  }),
);

export const subSectionsRelations = relations(subSections, ({ one, many }) => ({
  courseChapterSections: one(courseChapterSections, {
    fields: [subSections.sectionId],
    references: [courseChapterSections.id],
  }),
  blocks: many(blocks),
}));

export const blocks = mysqlTable(
  "blocks",
  {
    id: int("id").primaryKey().autoincrement(),
    subSectionId: int("sub_section_id").notNull(),
    order: int("order").notNull(),
    markdown: text("markdown").notNull(),
  },
  (t) => ({
    unq: unique().on(t.subSectionId, t.order),
  }),
);

export const blocksRelations = relations(blocks, ({ one, many }) => ({
  subSections: one(subSections, {
    fields: [blocks.subSectionId],
    references: [subSections.id],
  }),
  interactiveComponents: many(interactiveComponents),
}));

export const interactiveComponents = mysqlTable("interactive_components", {
  id: int("id").primaryKey().autoincrement(),
  blockId: int("block_id").notNull(),
  type: varchar("type", { length: 50, enum: ["QUIZ", "QUESTION"] }).notNull(),
  quizId: int("quiz_id"),
  questionId: int("question_id"),
});

export const interactiveComponentsRelations = relations(
  interactiveComponents,
  ({ one }) => ({
    blocks: one(blocks, {
      fields: [interactiveComponents.blockId],
      references: [blocks.id],
    }),
    quizzes: one(quizzes, {
      fields: [interactiveComponents.quizId],
      references: [quizzes.id],
    }),
    questions: one(questions, {
      fields: [interactiveComponents.questionId],
      references: [questions.id],
    }),
  }),
);

export const quizzes = mysqlTable("quizzes", {
  id: int("id").primaryKey().autoincrement(),
  interactiveComponentId: int("interactive_component_id").notNull(),
  questionMarkdown: varchar("question_markdown", { length: 200 }).notNull(),
  optionOne: varchar("option_one", { length: 500 }).notNull(),
  optionTwo: varchar("option_two", { length: 500 }).notNull(),
  optionThree: varchar("option_three", { length: 500 }).notNull(),
  optionFour: varchar("option_four", { length: 500 }).notNull(),
  correctOption: varchar("correct_option", {
    length: 25,
    enum: ["ONE", "TWO", "THREE", "FOUR"],
  }).notNull(),
  explanationMarkdown: text("explanation_markdown").notNull(),
});

export const quizzesRelations = relations(quizzes, ({ one }) => ({
  interactiveComponents: one(interactiveComponents, {
    fields: [quizzes.interactiveComponentId],
    references: [interactiveComponents.id],
  }),
}));

export const questions = mysqlTable("questions", {
  id: int("id").primaryKey().autoincrement(),
  interactiveComponentId: int("interactive_component_id").notNull(),
  questionMarkdown: text("question_markdown").notNull(),
});

export const questionsRelations = relations(questions, ({ one }) => ({
  interactiveComponents: one(interactiveComponents, {
    fields: [questions.interactiveComponentId],
    references: [interactiveComponents.id],
  }),
}));

// export const courseChapterSection
