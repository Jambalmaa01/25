import { adminOrganizationSchema } from '@/lib/zod';
import { publicProcedure } from '../../procedures';
import {
  aliasedTable,
  organizationsTable,
  countriesTable,
  getTableColumns,
  usersTable,
  citiesTable,
  districtsTable,
  sql,
} from '@/lib/drizzle';
import { TRPCError } from '@trpc/server';
import { tRPCException } from '../../exception';
import { db, eq } from '@/lib/drizzle';

export const adminOrganizationQuery = publicProcedure
  .input(adminOrganizationSchema)
  .query(async ({ input }) => {
    try {
      const { organizationId } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

      const organizations = await db
        .select({
          ...getTableColumns(organizationsTable),
          addedUsername: addedBy.username,
          editedUsername: editedBy.username,
          removedUsername: removedBy.username,
          countryName: countriesTable.name,
          cityName: citiesTable.name,
          districtName: districtsTable.name,
          x: sql<number>`ST_X(${organizationsTable.geometry})`,
          y: sql<number>`ST_Y(${organizationsTable.geometry})`,
        })
        .from(organizationsTable)
        .leftJoin(addedBy, eq(addedBy.id, organizationsTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, organizationsTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, organizationsTable.removedBy))
        .leftJoin(
          countriesTable,
          eq(countriesTable.id, organizationsTable.countryId)
        )
        .leftJoin(citiesTable, eq(citiesTable.id, organizationsTable.cityId))
        .leftJoin(
          districtsTable,
          eq(districtsTable.id, organizationsTable.districtId)
        )
        .where(eq(organizationsTable.id, organizationId));

      const organization = organizations[0];

      if (!organization) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Олдсонгүй',
        });
      }

      return {
        organization,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
