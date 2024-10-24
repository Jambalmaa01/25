import { authSignInSchema } from '@/lib/zod';
import {
  db,
  employeesTable,
  EmployeeTable,
  eq,
  usersTable,
  UserTable,
} from '@/lib/drizzle';
import { publicProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';
import { compare } from 'bcryptjs';
import { generateAccessToken } from '../../utils';

export type AuthSignInReponse = UserTable & {
  employee: EmployeeTable;
};

export const authSignInMutation = publicProcedure
  .input(authSignInSchema)
  .mutation(async ({ input }) => {
    try {
      const { username, password } = input;

      const { user, employee } = await db.transaction(async tx => {
        const users = await tx
          .select()
          .from(usersTable)
          .where(eq(usersTable.username, username));

        const user = users[0];

        if (!user) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `Нэвтрэх нэр эсвэл нууц үгээ шалгана уу`,
          });
        }

        const isPasswordEqual = await compare(password, user.password);

        if (!isPasswordEqual) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `Нэвтрэх нэр эсвэл нууц үгээ шалгана уу`,
          });
        }

        if (!user.employeeId) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `Танд олгосон ажилтан байхгүй байна`,
          });
        }

        const employees = await tx
          .select()
          .from(employeesTable)
          .where(eq(employeesTable.id, user.employeeId));

        const employee = employees[0];

        if (!employee) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `Танд олгосон ажилтан байхгүй байна`,
          });
        }

        return { user, employee };
      });

      const accessToken = generateAccessToken(user.id);

      return {
        employee,
        accessToken,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
