import { adminOrganizationAddSchema } from '@/lib/zod';
import { organizationsTable, db, eq } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminOrganizationAddMutation = adminProcedure
  .input(adminOrganizationAddSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const {
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
        const isOrganizationCodeNameExists = await db
          .select()
          .from(organizationsTable)
          .where(eq(organizationsTable.codeName, codeName));

        if (isOrganizationCodeNameExists.length > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: `"${codeName}" код аль хэдийн бүртгэсэн байна`,
          });
        }

        const organizations = await tx
          .insert(organizationsTable)
          .values({
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
            addedAt: new Date(),
            addedBy: user.id,
          })
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
