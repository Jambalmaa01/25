import { sign } from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';

export function generateAccessToken(id: string) {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'ACCESS_TOKEN_SECRET not found',
    });
  }

  const accessToken = sign({ sub: id }, process.env.ACCESS_TOKEN_SECRET);

  return accessToken;
}
