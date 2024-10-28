import { adminDistrictRemoveForeverSchema } from '@/lib/zod';
import { districtsTable, db, inArray } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminDistrictRemoveForeverMutation = adminProcedure
  .input(adminDistrictRemoveForeverSchema)
  .mutation(async ({ input }) => {
    try {
      const { districtIds, token } = input;

      if (token !== process.env.DELETE_FOREVER_TOKEN) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Токен буруу байна',
        });
      }

      const districts = await db.transaction(async tx => {
        const districts = await tx
          .delete(districtsTable)
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
