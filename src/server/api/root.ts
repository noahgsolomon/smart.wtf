import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/users";
import { courseRouter } from "./routers/courses";
import { aiRouter } from "./routers/ai";
import { notesRouter } from "./routers/notes";

export const appRouter = createTRPCRouter({
  user: userRouter,
  course: courseRouter,
  ai: aiRouter,
  notes: notesRouter,
});

export type AppRouter = typeof appRouter;
