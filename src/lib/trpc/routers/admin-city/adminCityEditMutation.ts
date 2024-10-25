import { adminCityEditSchema } from '@/lib/zod';
import { and, citiesTable, db, eq, not } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminCityEditMutation = adminProcedure
  .input(adminCityEditSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { cityId, name, codeName, countryId } = input;

      const city = await db.transaction(async tx => {
        const isCityNameExists = await db
          .select()
          .from(citiesTable)
          .where(
            and(eq(citiesTable.name, name), not(eq(citiesTable.id, cityId)))
          );

        if (isCityNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${name}" аль хэдийн бүртгэсэн байна`,
          });
        }

        const isCityCodeNameExists = await db
          .select()
          .from(citiesTable)
          .where(
            and(
              eq(citiesTable.codeName, codeName),
              not(eq(citiesTable.id, cityId))
            )
          );

        if (isCityCodeNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${codeName}" код аль хэдийн бүртгэсэн байна`,
          });
        }

        const cities = await tx
          .update(citiesTable)
          .set({
            name,
            codeName,
            countryId,
            editedAt: new Date(),
            editedBy: user.id,
          })
          .where(eq(citiesTable.id, cityId))
          .returning();

        const city = cities[0];

        return city;
      });

      return {
        city,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
