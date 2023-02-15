import { router, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";

const defaultProjectSelect = Prisma.validator<Prisma.ProjectSelect>()({
  id: true,
  name: true,
  description: true,
});

export const projectRouter = router({
  listByTeam: publicProcedure
    .input(z.object({ teamId: z.string() }))
    .query(async ({ ctx, input }) => {
      const waiting = await prisma.project.findMany({
        select: defaultProjectSelect,
        where: {
          teamId: input.teamId,
          project_state: {
            equals: "WAITING",
          },
        },
      });
      const in_progress = await prisma.project.findMany({
        select: defaultProjectSelect,
        where: {
          teamId: input.teamId,
          project_state: {
            equals: "IN_PROGRESS",
          },
        },
      });
      const completed = await prisma.project.findMany({
        select: defaultProjectSelect,
        where: {
          teamId: input.teamId,
          project_state: {
            equals: "COMPLETED",
          },
        },
      });
      return {
        waiting: waiting,
        in_progress: in_progress,
        completed: completed,
      };
    }),
  // list: publicProcedure
  //   .input(
  //     z.object({
  //       userId: z.string(),
  //       limit: z.number().max(100).nullish(),
  //     }),
  //   )
  //   .query(async ({ input }) => {
  //     const limit = input.limit ?? 50;
  //     const items = await prisma.team.findMany({
  //       select: {
  //         id: true,
  //         name: true,
  //       },
  //       where: {
  //         memberships: {
  //           some: {
  //             account: {
  //               userId: input.userId,
  //             },
  //           },
  //         },
  //       },
  //       take: limit,
  //     });
  //     return {
  //       items: items,
  //     };
  //   }),
});
