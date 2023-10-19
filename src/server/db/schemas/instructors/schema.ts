import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { users } from "../users/schema";

export const instructors = mysqlTable("instructors", {
  id: int("id").primaryKey().autoincrement(),
  user_id: int("user_id").notNull(),
  name: int("name").notNull(),
});

export const instructorsRelations = relations(instructors, ({ one }) => ({
  user: one(users, {
    fields: [instructors.user_id],
    references: [users.id],
  }),
}));
