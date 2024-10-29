import { adminOrganizationEditSchema } from '@/lib/zod';
import { and, organizationsTable, db, eq, not } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminOrganizationEditMutation = adminProcedure
  .input(adminOrganizationEditSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const {
        organizationId,
        name,
        codeName,
        identityNumber,
        countryId,
        cityId,
        districtId,
        x,
        y,
        zone,
        direction,
        establishmentedDate,
        pronunciation,
        borderRepresentative,
        ranking,
        electricPowerSource,
        lengthResponsibleBorder,
        lengthDryLand,
        lengthWaterBoundaryLength,
        distanceFromBorder,
        distanceFromWestern,
        distanceFromEastern,
        distanceFromWesternNeighborDetachment,
        distanceFromEasternNeighborDetachment,
        distanceFromUlaanbaatar,
        distanceFromCity,
        distanceFromDistrict,
        networkMobicom,
        networkSkytel,
        networkUnitel,
        networkGmobile,
        nerelberM100k,
        coordinateM100k,
      } = input;

      const organization = await db.transaction(async tx => {
        const isOrganizationNameExists = await db
          .select()
          .from(organizationsTable)
          .where(
            and(
              eq(organizationsTable.name, name),
              not(eq(organizationsTable.id, organizationId))
            )
          );

        if (isOrganizationNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${name}" аль хэдийн бүртгэсэн байна`,
          });
        }

        const isOrganizationCodeNameExists = await db
          .select()
          .from(organizationsTable)
          .where(
            and(
              eq(organizationsTable.codeName, codeName),
              not(eq(organizationsTable.id, organizationId))
            )
          );

        if (isOrganizationCodeNameExists.length) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${codeName}" код аль хэдийн бүртгэсэн байна`,
          });
        }

        const organizations = await tx
          .update(organizationsTable)
          .set({
            name,
            codeName,
            identityNumber,
            countryId,
            cityId,
            districtId,
            zone,
            direction,
            establishmentedDate,
            pronunciation,
            borderRepresentative,
            ranking,
            electricPowerSource,
            lengthResponsibleBorder,
            lengthDryLand,
            lengthWaterBoundaryLength,
            distanceFromBorder,
            distanceFromWestern,
            distanceFromEastern,
            distanceFromWesternNeighborDetachment,
            distanceFromEasternNeighborDetachment,
            distanceFromUlaanbaatar,
            distanceFromCity,
            distanceFromDistrict,
            networkMobicom,
            networkSkytel,
            networkUnitel,
            networkGmobile,
            nerelberM100k,
            coordinateM100k,
            geometry: `POINT(${x} ${y})`,
            editedAt: new Date(),
            editedBy: user.id,
          })
          .where(eq(organizationsTable.id, organizationId))
          .returning();

        const organization = organizations[0];

        return organization;
      });

      return {
        organization,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
