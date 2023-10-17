import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
	user: protectedProcedure.query(async (req) => {
		console.log(req.ctx);
		return req.ctx.user.userId;
	}),
});
