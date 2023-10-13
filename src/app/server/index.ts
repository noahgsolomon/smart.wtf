import { eq } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/mysql2'
import { z } from "zod";
import { todos } from "@/db/schema";
import mysql from "mysql2/promise";
import config from '../../../drizzle.config';
import { publicProcedure, router } from "./trpc";
import { userRouter } from "./routes/users";

async function initializeDatabase() {
    const dbConnection = await mysql.createConnection(config.dbCredentials.connectionString);
    return drizzle(dbConnection);
}

const db = initializeDatabase();

export const appRouter = router({
    hey: publicProcedure.query(async (req) => {
      console.log(JSON.stringify(req))
        return "sup";
    }),
    users: userRouter
  });

export type AppRouter = typeof appRouter;