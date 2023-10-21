import { authMiddleware } from "@clerk/nextjs";

// Use named export for authMiddleware
export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/stripe"],
  ignoredRoutes: ["/api/webhooks/stripe"],
});

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
