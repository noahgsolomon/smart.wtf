import {
	getAuth,
	SignedInAuthObject,
	SignedOutAuthObject,
} from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import superjson from "superjson";
import * as trpc from "@trpc/server";
import { NextRequest } from "next/server";
import { NextApiRequest } from "next";
import { auth } from "@clerk/nextjs";

// interface AuthContext {
//   auth: SignedInAuthObject | SignedOutAuthObject;
// }

// export const createContextInner = async ({ auth }: AuthContext  ) => {
//   return {
//     auth,
//   }
// }

// export type RequestLike = NextRequest | NextApiRequest;

// export const createContext = async (
//   req: RequestLike
// ) => {
//   return await createContextInner({ auth: getAuth(req) })
// }

// export type Context = trpc.inferAsyncReturnType<typeof createContext>;

const t = initTRPC.create({
	transformer: superjson,
	errorFormatter({ shape }) {
		return shape;
	},
});

// check if the user is signed in, otherwise throw a UNAUTHORIZED CODE
const isAuthed = t.middleware(({ next }) => {
	const user = auth();
	if (!user || !user.userId) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	return next({
		ctx: {
			user,
		},
	});
});

export const router = t.router;

export const publicProcedure = t.procedure;

// export this procedure to be used anywhere in your application
export const protectedProcedure = t.procedure.use(isAuthed);
