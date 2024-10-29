import { adminDepartmentEditSchema } from '@/lib/zod';
import { and, departmentsTable, db, eq, not } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminDepartmentEditMutation = adminProcedure
  .input(adminDepartmentEditSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const {
        departmentId,
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
        x,
        y,
      } = input;

      const department = await db.transaction(async tx => {
        const isDepartmentNameExists = await db
          .select()
          .from(departmentsTable)
          .where(
            and(
              eq(departmentsTable.name, name),
              not(eq(departmentsTable.id, departmentId))
            )
          );

        if (isDepartmentNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${name}" аль хэдийн бүртгэсэн байна`,
          });
        }

        const isDepartmentCodeNameExists = await db
          .select()
          .from(departmentsTable)
          .where(
            and(
              eq(departmentsTable.codeName, codeName),
              not(eq(departmentsTable.id, departmentId))
            )
          );

        if (isDepartmentCodeNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${codeName}" код аль хэдийн бүртгэсэн байна`,
          });
        }

        const departments = await tx
          .update(departmentsTable)
          .set({
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
            editedAt: new Date(),
            editedBy: user.id,
          })
          .where(eq(departmentsTable.id, departmentId))
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
