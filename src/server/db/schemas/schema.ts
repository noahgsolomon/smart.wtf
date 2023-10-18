import { relations, sql } from "drizzle-orm";
import {
  bigint,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { other } from "./other/schema";

export const posts = mysqlTable("post", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
  user_id: int("user_id").notNull(),
});

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 200 }).notNull(),
  password: varchar("password", { length: 100 }),
  email: varchar("email", { length: 100 }).notNull().unique(),
  clerk_id: varchar("clerk_id", { length: 200 }).notNull().unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  other: many(other),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.user_id],
    references: [users.id],
  }),
}));
