import { TRPCError } from '@trpc/server';

export function tRPCException(err: unknown): TRPCError {
  if (err instanceof Error) {
    return new TRPCError({
      code: 'BAD_REQUEST',
      message: err.message,
    });
  }

  if (err instanceof TRPCError) {
    return new TRPCError(err);
  }

  return new TRPCError({
    code: 'BAD_REQUEST',
    message: 'Something went wrong',
  });
}
