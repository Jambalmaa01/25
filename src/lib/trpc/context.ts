import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export function createContext(ctx: FetchCreateContextFnOptions) {
  const { req } = ctx;

  return { req };
}

export type Context = inferAsyncReturnType<typeof createContext>;
