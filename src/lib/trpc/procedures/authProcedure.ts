import { TRPCError } from '@trpc/server';
import { db, employeesTable, eq, usersTable } from '@/lib/drizzle';
import { publicProcedure } from './publicProcedure';
import { verifyAccessToken } from '../utils';

export const authProcedure = publicProcedure.use(async ({ next, ...opts }) => {
  const { ctx } = opts;
  const { req } = ctx;

  let token: string = '';

  const authorizationHeader = req.headers.get('authorization');

  if (!authorizationHeader) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `"Authorization" толгой байхгүй байна`,
    });
  }

  token = authorizationHeader.split(' ')[1];

  if (!token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Токен буруу байна',
    });
  }

  const payload = verifyAccessToken(token);

  if (!payload.sub) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Токенд хэрэглэгчийн дугаар байхгүй байна',
    });
  }

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, payload.sub));

  const user = users[0];

  if (!user) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Токеноос хэрэглэгч олдсонгүй',
    });
  }

  if (!user.employeeId) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Танд олгосон ажилтан байхгүй байна',
    });
  }

  const employees = await db
    .select()
    .from(employeesTable)
    .where(eq(employeesTable.id, user.employeeId));

  const employee = employees[0];

  if (!employee) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Танд олгосон ажилтан байхгүй байна',
    });
  }

  return next({
    ...opts,
    ctx: {
      ...opts.ctx,
      user,
      employee,
    },
  });
});
