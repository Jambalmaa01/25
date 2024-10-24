import { adminCountryEditSchema } from '@/lib/zod';
import { and, countriesTable, db, eq, not } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminCountryEditMutation = adminProcedure
  .input(adminCountryEditSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { countryId, name, codeName } = input;

      const country = await db.transaction(async tx => {
        const isCountryNameExists = await db
          .select()
          .from(countriesTable)
          .where(
            and(
              eq(countriesTable.name, name),
              not(eq(countriesTable.id, countryId))
            )
          );

        if (isCountryNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${name}" улс аль хэдийн бүртгэсэн байна`,
          });
        }

        const isCountryCodeNameExists = await db
          .select()
          .from(countriesTable)
          .where(
            and(
              eq(countriesTable.codeName, codeName),
              not(eq(countriesTable.id, countryId))
            )
          );

        if (isCountryCodeNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${codeName}" кодтой улс аль хэдийн бүртгэсэн байна`,
          });
        }

        const countries = await tx
          .update(countriesTable)
          .set({
            name,
            codeName,
            editedAt: new Date(),
            editedBy: user.id,
          })
          .where(eq(countriesTable.id, countryId))
          .returning();

        const country = countries[0];

        return country;
      });

      return {
        country,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
