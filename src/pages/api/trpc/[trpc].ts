import { createContext } from "@/server/context";
import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "src/server/routers/_app";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  responseMeta({ ctx, paths, type, errors }) {
    // assuming you have all your public routes with the keyword `public` in them
    const allPublic = paths && paths.every((path) => path.includes("public"));
    // checking that no procedures errored
    const allOk = errors.length === 0;
    // checking we're doing a query request
    const isQuery = type === "query";
    if (ctx?.res && allPublic && allOk && isQuery) {
      // cache request for 3 minutes + revalidate once every second
      const THREE_MINUTES_IN_SECONDS = 60 * 3;
      return {
        headers: {
          "cache-control": `s-maxage=1, stale-while-revalidate=${THREE_MINUTES_IN_SECONDS}`,
        },
      };
    }
    return {};
  },
});
