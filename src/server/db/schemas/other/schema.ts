import { relations } from "drizzle-orm";
import { int, mysqlTable, text } from "drizzle-orm/mysql-core";
import { users } from "../schema";

export const other = mysqlTable("other", {
  id: int("id").primaryKey().autoincrement(),
  junk: text("junk").notNull(),
  user_id: int("user_id").notNull(),
});

export const otherRelation = relations(other, ({ one }) => ({
  user: one(users, {
    fields: [other.user_id],
    references: [users.id],
  }),
}));
