import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/notes/:noteId",
    "/api/webhooks/stripe",
    "/api/trpc/quiz.isQuizAvailable",
    "/api/trpc/notes.getUserNotesMeta",
    "/api/trpc/notes.findRandomNotes",
    "/api/trpc/notes.getNote",
  ],
  ignoredRoutes: ["/api/webhooks/stripe"],
});

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
