import { adminCountryRemoveSchema } from '@/lib/zod';
import { countriesTable, db, inArray } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminCountryRemoveMutation = adminProcedure
  .input(adminCountryRemoveSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { countryIds } = input;

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
          .update(countriesTable)
          .set({
            removedAt: new Date(),
            removedBy: user.id,
          })
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
