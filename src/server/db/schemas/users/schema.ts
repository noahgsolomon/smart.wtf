import { relations } from "drizzle-orm";
import {
  boolean,
  datetime,
  int,
  mysqlTable,
  unique,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { blocks, courseLikes, courses } from "../courses/schema";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 200 }).notNull(),
  password: varchar("password", { length: 100 }),
  email: varchar("email", { length: 100 }).notNull().unique(),
  username: varchar("username", { length: 30 }).notNull().unique(),
  clerk_id: varchar("clerk_id", { length: 200 }).notNull().unique(),
  subscribed: boolean("subscribed").notNull().default(false),
  created_at: datetime("created_at", { mode: "date" })
    .notNull()
    .default(new Date()),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  stripeCurrentPeriodEnd: datetime("stripe_current_period_end", {
    mode: "date",
  }),
});

export const usersRelations = relations(users, ({ many }) => ({
  courseLikes: many(courseLikes),

  courses: many(courses),
}));

export const userCompletedBlocks = mysqlTable(
  "user_completed_blocks",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: int("user_id").notNull(),
    blockId: int("block_id").notNull(),
    completedAt: datetime("completed_at", { mode: "date" })
      .notNull()
      .default(new Date()),
  },
  (t) => ({
    unq: unique().on(t.userId, t.blockId),
    userBlockIdx: uniqueIndex("user_block_idx").on(t.userId, t.blockId),
  }),
);

export const userCompletedBlocksRelations = relations(
  userCompletedBlocks,
  ({ one }) => ({
    users: one(users, {
      fields: [userCompletedBlocks.userId],
      references: [users.id],
    }),
    blocks: one(blocks, {
      fields: [userCompletedBlocks.blockId],
      references: [blocks.id],
    }),
  }),
);
