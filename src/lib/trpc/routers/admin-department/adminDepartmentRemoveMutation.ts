import { adminDepartmentRemoveSchema } from '@/lib/zod';
import { departmentsTable, db, inArray } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';

export const adminDepartmentRemoveMutation = adminProcedure
  .input(adminDepartmentRemoveSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { departmentIds } = input;

      const departments = await db.transaction(async tx => {
        const departments = await tx
          .update(departmentsTable)
          .set({
            removedAt: new Date(),
            removedBy: user.id,
          })
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
