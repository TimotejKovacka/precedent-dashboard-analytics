import { router, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";

export const teamRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().max(100).nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session?.user)
        return <TRPCError>{
          name: "TRPCError",
          code: "UNAUTHORIZED",
          message: "Please sign-in to access this page",
        };
      const limit = input.limit ?? 50;

      const items = await prisma.team.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          memberships: {
            some: {
              account: {
                userId: ctx.session?.user?.id,
              },
            },
          },
        },
        take: limit,
      });

      return {
        items: items,
      };
    }),
});
