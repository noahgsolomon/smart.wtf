import { relations } from "drizzle-orm";
import { index, int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { users } from "../users/schema";
import { agents } from "../agents/schema";

export const notes = mysqlTable(
  "notes",
  {
    id: int("id").primaryKey().autoincrement(),
    user_id: int("user_id").notNull(),
    markdown: text("markdown").notNull(),
    agents_markdown: text("agents_markdown").notNull(),
    title: varchar("title", { length: 100 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    imageUrl: varchar("image_url", { length: 1000 }),
    agent_id: int("agent_id").notNull(),
    minutes: int("minutes").notNull(),
    description: varchar("description", { length: 1000 }),
  },
  (t) => ({
    userIdx: index("user_idx").on(t.user_id),
  }),
);

export const notesRelations = relations(notes, ({ one }) => ({
  users: one(users, {
    fields: [notes.user_id],
    references: [users.id],
  }),
  agents: one(agents, {
    fields: [notes.agent_id],
    references: [agents.id],
  }),
}));
