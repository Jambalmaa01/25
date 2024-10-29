import { adminDepartmentAddSchema } from '@/lib/zod';
import { departmentsTable, db, eq } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminDepartmentAddMutation = adminProcedure
  .input(adminDepartmentAddSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const {
        name,
        codeName,
        identityNumber,
        countryId,
        cityId,
        districtId,
        organizationId,
        x,
        y,
        zone,
        direction,
        establishmentedDate,
        ranking,
        electricPowerSource,
        beverageSource,
        beverageSourceNumber,
        lengthResponsibleBorder,
        lengthDryLand,
        lengthWaterBoundaryLength,
        distanceFromBorder,
        distanceFromWestern,
        distanceFromEastern,
        distanceFromDetachment,
        distanceFromDistrict,
        networkMobicom,
        networkSkytel,
        networkUnitel,
        networkGmobile,
        networkVsat,
      } = input;

      const department = await db.transaction(async tx => {
        const isDepartmentCodeNameExists = await db
          .select()
          .from(departmentsTable)
          .where(eq(departmentsTable.codeName, codeName));

        if (isDepartmentCodeNameExists.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${codeName}" код аль хэдийн бүртгэсэн байна`,
          });
        }

        const departments = await tx
          .insert(departmentsTable)
          .values({
            name,
            codeName,
            identityNumber,
            countryId,
            cityId,
            districtId,
            organizationId,
            zone,
            direction,
            establishmentedDate,
            ranking,
            electricPowerSource,
            beverageSource,
            beverageSourceNumber,
            lengthResponsibleBorder,
            lengthDryLand,
            lengthWaterBoundaryLength,
            distanceFromBorder,
            distanceFromWestern,
            distanceFromEastern,
            distanceFromDetachment,
            distanceFromDistrict,
            networkMobicom,
            networkSkytel,
            networkUnitel,
            networkGmobile,
            networkVsat,
            geometry: `POINT(${x} ${y})`,
            addedAt: new Date(),
            addedBy: user.id,
          })
          .returning();

        const department = departments[0];

        return department;
      });

      return {
        department,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
