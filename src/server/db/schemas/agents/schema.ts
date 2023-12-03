import { int, mysqlTable, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const agents = mysqlTable(
  "agents",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 200 }).notNull(),
    assistantId: varchar("assistant_id", { length: 200 }).notNull().unique(),
    pfp: varchar("pfp", { length: 1000 }).notNull(),
  },
  (t) => ({
    assistantIdx: uniqueIndex("assistant_idx").on(t.assistantId),
  }),
);
