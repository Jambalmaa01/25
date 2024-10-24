import { TRPCError } from '@trpc/server';
import { db, eq, rolesTable } from '@/lib/drizzle';
import { authProcedure } from './authProcedure';

export const adminProcedure = authProcedure.use(async ({ next, ...opts }) => {
  const { ctx } = opts;
  const { user } = ctx;

  const roles = await db
    .select()
    .from(rolesTable)
    .where(eq(rolesTable.id, user.roleId));

  const role = roles[0];

  if (role.codeName !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Танд админ эрх байхгүй байна',
    });
  }

  return next(opts);
});
