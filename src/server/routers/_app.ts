import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { projectRouter } from "./project";
import { teamRouter } from "./team";

export const appRouter = router({
  team: teamRouter,
  project: projectRouter,
});

export type AppRouter = typeof appRouter;
