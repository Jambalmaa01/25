import { adminCityAddSchema } from '@/lib/zod';
import { citiesTable, db, eq } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminCityAddMutation = adminProcedure
  .input(adminCityAddSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { name, codeName, countryId } = input;

      const city = await db.transaction(async tx => {
        const isCityNameExists = await db
          .select()
          .from(citiesTable)
          .where(eq(citiesTable.name, name));

        if (isCityNameExists.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${name}" аль хэдийн бүртгэсэн байна`,
          });
        }

        const isCityCodeNameExists = await db
          .select()
          .from(citiesTable)
          .where(eq(citiesTable.codeName, codeName));

        if (isCityCodeNameExists.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${codeName}" код аль хэдийн бүртгэсэн байна`,
          });
        }

        const cities = await tx
          .insert(citiesTable)
          .values({
            name,
            codeName,
            countryId,
            addedAt: new Date(),
            addedBy: user.id,
          })
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
