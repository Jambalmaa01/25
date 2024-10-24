import { adminCountryAddSchema } from '@/lib/zod';
import { countriesTable, db, eq } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminCountryAddMutation = adminProcedure
  .input(adminCountryAddSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { name, codeName } = input;

      const country = await db.transaction(async tx => {
        const isCountryNameExists = await db
          .select()
          .from(countriesTable)
          .where(eq(countriesTable.name, name));

        if (isCountryNameExists.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${name}" улс аль хэдийн бүртгэсэн байна`,
          });
        }

        const isCountryCodeNameExists = await db
          .select()
          .from(countriesTable)
          .where(eq(countriesTable.codeName, codeName));

        if (isCountryCodeNameExists.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${codeName}" кодтой улс аль хэдийн бүртгэсэн байна`,
          });
        }

        const countries = await tx
          .insert(countriesTable)
          .values({
            name,
            codeName,
            addedAt: new Date(),
            addedBy: user.id,
          })
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
