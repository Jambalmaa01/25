import { adminCountryRemoveForeverSchema } from '@/lib/zod';
import { countriesTable, db, inArray } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminCountryRemoveForeverMutation = adminProcedure
  .input(adminCountryRemoveForeverSchema)
  .mutation(async ({ input }) => {
    try {
      const { countryIds, token } = input;

      if (token !== process.env.DELETE_FOREVER_TOKEN) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Токен буруу байна',
        });
      }

      const countries = await db.transaction(async tx => {
        const isCountryNameExists = await db
          .select()
          .from(countriesTable)
          .where(inArray(countriesTable.id, countryIds));

        if (!isCountryNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `Улсын таних нэр хүчингүй байна`,
          });
        }

        const countries = await tx
          .delete(countriesTable)
          .where(inArray(countriesTable.id, countryIds))
          .returning();

        return countries;
      });

      return {
        countries,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
