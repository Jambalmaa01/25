import { adminDistrictRemoveSchema } from '@/lib/zod';
import { districtsTable, db, inArray } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';

export const adminDistrictRemoveMutation = adminProcedure
  .input(adminDistrictRemoveSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { districtIds } = input;

      const districts = await db.transaction(async tx => {
        const districts = await tx
          .update(districtsTable)
          .set({
            removedAt: new Date(),
            removedBy: user.id,
          })
          .where(inArray(districtsTable.id, districtIds))
          .returning();

        return districts;
      });

      return {
        districts,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
