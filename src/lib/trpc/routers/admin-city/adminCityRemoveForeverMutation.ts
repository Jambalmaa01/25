import { adminCityRemoveForeverSchema } from '@/lib/zod';
import { citiesTable, db, inArray } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminCityRemoveForeverMutation = adminProcedure
  .input(adminCityRemoveForeverSchema)
  .mutation(async ({ input }) => {
    try {
      const { cityIds, token } = input;

      if (token !== process.env.DELETE_FOREVER_TOKEN) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Токен буруу байна',
        });
      }

      const cities = await db.transaction(async tx => {
        const cities = await tx
          .delete(citiesTable)
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
