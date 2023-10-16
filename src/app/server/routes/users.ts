import { protectedProcedure, publicProcedure, router } from "../trpc";

export const userRouter = router({
    user: protectedProcedure.query(async (req) => {
        return "user";
    }),
  });