import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as schema from "./schemas/schema";
import * as otherSchema from "./schemas/other/schema";

export const db = drizzle(
  new Client({
    url: process.env.DATABASE_URL,
  }).connection(),
  { schema: { ...schema, ...otherSchema } },
);
