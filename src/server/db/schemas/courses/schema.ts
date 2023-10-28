import { int, mysqlTable, unique, varchar } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { users } from "../users/schema";

export const courses = mysqlTable("courses", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", {length: 200}).notNull(),
  description: varchar("description", {length: 500}).notNull(),
  instructorId: int("instructor_id").notNull(),
  likesCount: int('likes_count').default(0).notNull(),
  imageUrl: varchar('image_url', {length: 100}).notNull(),
  difficulty: varchar('difficulty', {length: 25, enum: ['EASY'  , 'MEDIUM', 'HARD']}).notNull().default('EASY')
});

export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  courseLikes: many(courseLikes)
}));

export const courseLikes = mysqlTable('course_likes', {
  id: int('id').primaryKey().autoincrement(),
  courseId: int('course_id').notNull(),
  userId: int('user_id').notNull()
}, (t) => ({
  unq: unique().on(t.userId, t.courseId),
}));

export const courseLikesRelations = relations(courseLikes, ({one}) => ({

  users: one(users, {
    fields: [courseLikes.userId],
    references: [users.id]
  }),

  courses: one(courses, {
    fields: [courseLikes.courseId],
    references: [courses.id]
  })


}));