import { adminDepartmentRemoveForeverSchema } from '@/lib/zod';
import { departmentsTable, db, inArray } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminDepartmentRemoveForeverMutation = adminProcedure
  .input(adminDepartmentRemoveForeverSchema)
  .mutation(async ({ input }) => {
    try {
      const { departmentIds, token } = input;

      if (token !== process.env.DELETE_FOREVER_TOKEN) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Токен буруу байна',
        });
      }

      const departments = await db.transaction(async tx => {
        const departments = await tx
          .delete(departmentsTable)
          .where(inArray(departmentsTable.id, departmentIds))
          .returning();

        return departments;
      });

      return {
        departments,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
