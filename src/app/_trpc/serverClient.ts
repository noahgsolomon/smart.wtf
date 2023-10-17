// import { httpBatchLink } from "@trpc/client";
// import { appRouter } from "@/app/server";
// import { getAuth, SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/server';

// export const createServerClient = (req: any) => {
//   const auth: SignedInAuthObject | SignedOutAuthObject = getAuth(req);

//   return appRouter.createCaller({
//     auth: auth
//   });
// };