/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Session | null;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(opts: CreateInnerContextOptions) {
  return {
    session: opts.session,
  };
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  // for API-response caching see https://trpc.io/docs/caching
  const session = await getSession({ req: opts.req });

  const contextInner = await createContextInner({ session });

  return { ...contextInner, req: opts.req, res: opts.res };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
