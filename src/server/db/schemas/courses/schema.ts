import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { instructors } from "../instructors/schema";
import { relations } from "drizzle-orm";

export const courses = mysqlTable("courses", {
  id: int("id").primaryKey().autoincrement(),
  name: int("name").notNull(),
  description: int("description").notNull(),
  instructor_id: int("instructor_id").notNull(),
});

export const coursesRelations = relations(courses, ({ one }) => ({
  instructor: one(instructors, {
    fields: [courses.instructor_id],
    references: [instructors.id],
  }),
}));
