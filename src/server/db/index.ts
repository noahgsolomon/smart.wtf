import { Client } from "@planetscale/database";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as userSchema from "./schemas/users/schema";
import * as coursesSchema from "./schemas/courses/schema";
import * as aiSchema from "./schemas/ai/schema";
import * as notesSchema from "./schemas/notes/schema";
import * as agentsSchema from "./schemas/agents/schema";
import * as brainrotSchema from "./schemas/brainrot/schema";

const connection = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  uri: process.env.DATABASE_URL,
});

export const db = drizzle(connection, {
  schema: {
    ...userSchema,
    ...coursesSchema,
    ...aiSchema,
    ...notesSchema,
    ...agentsSchema,
    ...brainrotSchema,
  },
  mode: "default",
});
