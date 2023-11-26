import { datetime, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "../users/schema";
import { relations } from "drizzle-orm";

export const userThread = mysqlTable("user_thread", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").notNull().unique(),
  threadId: varchar("thread_id", { length: 200 }).notNull(),
  assistantId: varchar("assistant_id", { length: 200 }).notNull(),
  createdAt: datetime("created_at", { mode: "date" })
    .notNull()
    .default(new Date()),
});

export const userThreadRelations = relations(userThread, ({ one }) => ({
  users: one(users, {
    fields: [userThread.userId],
    references: [users.id],
  }),
}));
