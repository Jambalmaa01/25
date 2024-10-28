import { adminDistrictAddSchema } from '@/lib/zod';
import { districtsTable, db, eq } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminDistrictAddMutation = adminProcedure
  .input(adminDistrictAddSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { name, codeName, countryId, cityId } = input;

      const district = await db.transaction(async tx => {
        const isDistrictCodeNameExists = await db
          .select()
          .from(districtsTable)
          .where(eq(districtsTable.codeName, codeName));

        if (isDistrictCodeNameExists.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${codeName}" код аль хэдийн бүртгэсэн байна`,
          });
        }

        const districts = await tx
          .insert(districtsTable)
          .values({
            name,
            codeName,
            countryId,
            cityId,
            addedAt: new Date(),
            addedBy: user.id,
          })
          .returning();

        const district = districts[0];

        return district;
      });

      return {
        district,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
