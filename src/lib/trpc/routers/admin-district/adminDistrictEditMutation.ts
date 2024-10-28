import { adminDistrictEditSchema } from '@/lib/zod';
import { and, districtsTable, db, eq, not } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminDistrictEditMutation = adminProcedure
  .input(adminDistrictEditSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { districtId, name, codeName, countryId, cityId } = input;

      const district = await db.transaction(async tx => {
        const isDistrictNameExists = await db
          .select()
          .from(districtsTable)
          .where(
            and(
              eq(districtsTable.name, name),
              not(eq(districtsTable.id, districtId))
            )
          );

        if (isDistrictNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${name}" аль хэдийн бүртгэсэн байна`,
          });
        }

        const isDistrictCodeNameExists = await db
          .select()
          .from(districtsTable)
          .where(
            and(
              eq(districtsTable.codeName, codeName),
              not(eq(districtsTable.id, districtId))
            )
          );

        if (isDistrictCodeNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${codeName}" код аль хэдийн бүртгэсэн байна`,
          });
        }

        const districts = await tx
          .update(districtsTable)
          .set({
            name,
            codeName,
            countryId,
            cityId,
            editedAt: new Date(),
            editedBy: user.id,
          })
          .where(eq(districtsTable.id, districtId))
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
