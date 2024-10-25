import { adminCityRemoveSchema } from '@/lib/zod';
import { citiesTable, db, inArray } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';

export const adminCityRemoveMutation = adminProcedure
  .input(adminCityRemoveSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { cityIds } = input;

      const cities = await db.transaction(async tx => {
        const cities = await tx
          .update(citiesTable)
          .set({
            removedAt: new Date(),
            removedBy: user.id,
          })
          .where(inArray(citiesTable.id, cityIds))
          .returning();

        return cities;
      });

      return {
        cities,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
