import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/users";
import { courseRouter } from "./routers/courses";

export const appRouter = createTRPCRouter({
  user: userRouter,
  course: courseRouter
});

export type AppRouter = typeof appRouter;
