import {
  boolean,
  datetime,
  index,
  int,
  json,
  mysqlTable,
  text,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { userCompletedBlocks, users } from "../users/schema";

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
    lessons: int("lessons").notNull().default(0),
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
  courseId: int("course_id").notNull().default(0),
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

export const courseChapterSections = mysqlTable(
  "course_chapter_sections",
  {
    id: int("id").primaryKey().autoincrement(),
    chapterId: int("chapter_id").notNull(),
    courseId: int("course_id").notNull().default(0),
    order: int("order").notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    description: varchar("description", { length: 500 }).notNull(),
    imageUrl: varchar("image_url", { length: 200 }).notNull(),
    implemented: boolean("implemented").notNull().default(false),
    lessonNumber: int("lesson_number").notNull().default(0),
  },
  (t) => ({
    unq: unique().on(t.chapterId, t.order), //change
    chapterOrderIdx: uniqueIndex("chapter_order_idx").on(t.chapterId, t.order), //change
  }),
);

export const courseChapterSectionsRelations = relations(
  courseChapterSections,
  ({ one, many }) => ({
    course: one(courses, {
      fields: [courseChapterSections.courseId],
      references: [courses.id],
    }),
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
    sectionIdx: index("section_idx").on(t.sectionId), //change
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
  userCompletedBlocks: many(userCompletedBlocks),
}));

export const interactiveComponents = mysqlTable("interactive_components", {
  id: int("id").primaryKey().autoincrement(),
  blockId: int("block_id").notNull(),
  type: varchar("type", {
    length: 50,
    enum: ["QUIZ", "UNDERSTANDING", "SORTING"],
  }).notNull(),
  quizId: int("quiz_id"),
  understandingId: int("understanding_id"),
  sortingId: int("sorting_id"),
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
    understanding: one(understanding, {
      fields: [interactiveComponents.understandingId],
      references: [understanding.id],
    }),
    sorting: one(sorting, {
      fields: [interactiveComponents.sortingId],
      references: [sorting.id],
    }),
  }),
);

export const quizzes = mysqlTable("quizzes", {
  id: int("id").primaryKey().autoincrement(),
  questionMarkdown: text("question_markdown").notNull(),
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

export const understanding = mysqlTable("understanding", {
  id: int("id").primaryKey().autoincrement(),
  questionMarkdown: text("question_markdown").notNull(),
  explanationMarkdown: text("explanation_markdown").notNull(),
});

export const latestActivity = mysqlTable("latest_activity", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull(),
  courseId: int("course_id").notNull(),
  sectionId: int("section_id").notNull(),
  subSectionId: int("sub_section_id").notNull(),
  blockId: int("block_id").notNull(),
});

export const latestActivityRelations = relations(latestActivity, ({ one }) => ({
  users: one(users, {
    fields: [latestActivity.userId],
    references: [users.id],
  }),
  courses: one(courses, {
    fields: [latestActivity.courseId],
    references: [courses.id],
  }),
  courseChapterSections: one(courseChapterSections, {
    fields: [latestActivity.sectionId],
    references: [courseChapterSections.id],
  }),
  subSections: one(subSections, {
    fields: [latestActivity.subSectionId],
    references: [subSections.id],
  }),
  blocks: one(blocks, {
    fields: [latestActivity.blockId],
    references: [blocks.id],
  }),
}));

export const courseProgress = mysqlTable(
  "course_progress",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: int("user_id").notNull(),
    courseId: int("course_id").notNull(),
    progress: varchar("progress", {
      length: 50,
      enum: ["STARTED", "COMPLETED"],
    }),
    startedAt: datetime("started_at"),
    completedAt: datetime("completed_at"),
  },
  (t) => ({
    unq: unique().on(t.userId, t.courseId),
    courseUserIdx: uniqueIndex("course_user_idx").on(t.userId, t.courseId),
  }),
);

export const courseProgressRelations = relations(courseProgress, ({ one }) => ({
  users: one(users, {
    fields: [courseProgress.userId],
    references: [users.id],
  }),
  courses: one(courses, {
    fields: [courseProgress.courseId],
    references: [courses.id],
  }),
}));

export const sorting = mysqlTable("sorting", {
  id: int("id").primaryKey().autoincrement(),
  questionMarkdown: text("question_markdown").notNull(),
  explanationMarkdown: text("explanation_markdown").notNull(),
  options: json("options").$type<string[]>().notNull(),
});
