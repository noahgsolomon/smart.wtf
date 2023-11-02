import {
  int,
  mysqlTable,
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
  ({ one }) => ({
    courseChapters: one(courseChapters, {
      fields: [courseChapterSections.chapterId],
      references: [courseChapters.id],
    }),
  }),
);

// export const courseChapterSection
