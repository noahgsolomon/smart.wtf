import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as userSchema from "./schemas/users/schema";
import * as coursesSchema from "./schemas/courses/schema";
import * as instructorsSchema from "./schemas/instructors/schema";

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema: { ...userSchema, ...coursesSchema, ...instructorsSchema } },
);