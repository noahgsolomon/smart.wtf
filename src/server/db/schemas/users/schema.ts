import {
  boolean,
  datetime,
  int,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 200 }).notNull(),
  password: varchar("password", { length: 100 }),
  email: varchar("email", { length: 100 }).notNull().unique(),
  clerk_id: varchar("clerk_id", { length: 200 }).notNull().unique(),
  subscribed: boolean("subscribed").notNull().default(false),
  created_at: datetime("created_at", { mode: "date" })
    .notNull()
    .default(new Date()),
});
