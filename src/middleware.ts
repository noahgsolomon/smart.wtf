import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/notes/:noteId/public",
    "/notes/:noteId",
    "/api/webhooks/stripe",
    "/api/trpc/quiz.isQuizAvailable",
    "/api/trpc/notes.getUserNotesMeta",
    "/api/trpc/notes.findRandomNotes",
    "/api/trpc/notes.getNote",
    "/api/trpc/notes.getNote,quiz.isQuizAvailable",
    "/api/trpc/notes.validateTopic",
    "/api/trpc/notes.validateTopic,notes.findRandomNotes",
    "/api/trpc/notes.findRandomNotes,notes.validateTopic",
  ],
  ignoredRoutes: ["/api/webhooks/stripe"],
});

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
