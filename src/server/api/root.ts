import { createTRPCRouter } from "./trpc";
import { dbRouter } from "./routers/dbRouter";
import { authRouter } from "./routers/authentication";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  dbRouter: dbRouter,
  authRouter:authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
