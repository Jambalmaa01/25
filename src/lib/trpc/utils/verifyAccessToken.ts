import { verify } from 'jsonwebtoken';
import { TRPCError } from '@trpc/server';

export function verifyAccessToken(token: string) {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'ACCESS_TOKEN_SECRET not found',
    });
  }

  try {
    const isVerified = verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!isVerified) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Токен хүчингүй байна',
      });
    }

    if (typeof isVerified === 'string') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Токен зөв олгоогүй байна',
      });
    }

    return isVerified;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Хүчингүй токен байна',
    });
  }
}
