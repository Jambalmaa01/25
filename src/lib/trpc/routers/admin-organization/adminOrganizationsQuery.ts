import { adminOrganizationsSchema } from '@/lib/zod';
import { adminProcedure } from '../../procedures';
import {
  aliasedTable,
  and,
  asc,
  between,
  organizationsTable,
  countriesTable,
  db,
  desc,
  eq,
  getTableColumns,
  ilike,
  or,
  sql,
  usersTable,
  citiesTable,
  districtsTable,
} from '@/lib/drizzle';
import { tRPCException } from '../../exception';
import {
  adminOrganizationsDefaultPage,
  adminOrganizationsDefaultSearch,
  adminOrganizationsDefaultTake,
  adminOrganizationsEndDate,
  adminOrganizationsSortColumn,
  adminOrganizationsSortDirection,
  adminOrganizationsStartDate,
} from '@/variables';
import { isUUID } from '@/utils';

export const adminOrganizationsQuery = adminProcedure
  .input(adminOrganizationsSchema)
  .query(async ({ input }) => {
    try {
      const {
        page = adminOrganizationsDefaultPage,
        take = adminOrganizationsDefaultTake,
        search = adminOrganizationsDefaultSearch,
        sortColumn = adminOrganizationsSortColumn,
        sortDirection = adminOrganizationsSortDirection,
        startDate = adminOrganizationsStartDate,
        endDate = adminOrganizationsEndDate,
      } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

      const searchFilter = search
        ? or(
            isUUID(search) ? eq(organizationsTable.id, search) : undefined,
            ilike(organizationsTable.name, `%${search}%`),
            ilike(organizationsTable.codeName, `%${search}%`),
            ilike(addedBy.username, `%${search}%`),
            ilike(editedBy.username, `%${search}%`),
            ilike(removedBy.username, `%${search}%`),
            ilike(countriesTable.name, `%${search}%`),
            ilike(citiesTable.name, `%${search}%`)
          )
        : undefined;

      const dateFilter =
        startDate && endDate
          ? between(
              organizationsTable.addedAt,
              new Date(startDate),
              new Date(endDate)
            )
          : undefined;

      const filters = and(searchFilter, dateFilter);

      const orderBy =
        sortColumn === 'addedUsername'
          ? sortDirection === 'asc'
            ? asc(addedBy.username)
            : desc(addedBy.username)
          : sortColumn === 'editedUsername'
          ? sortDirection === 'asc'
            ? asc(editedBy.username)
            : desc(editedBy.username)
          : sortColumn === 'removedUsername'
          ? sortDirection === 'asc'
            ? asc(removedBy.username)
            : desc(removedBy.username)
          : sortColumn === 'countryName'
          ? sortDirection === 'asc'
            ? asc(countriesTable.name)
            : desc(countriesTable.name)
          : sortColumn === 'cityName'
          ? sortDirection === 'asc'
            ? asc(citiesTable.name)
            : desc(citiesTable.name)
          : sortColumn === 'districtName'
          ? sortDirection === 'asc'
            ? asc(districtsTable.name)
            : desc(districtsTable.name)
          : sortDirection === 'asc'
          ? asc(organizationsTable[sortColumn])
          : desc(organizationsTable[sortColumn]);

      const total = await db.$count(organizationsTable);

      const foundRows = await db
        .select({ count: sql<number>`count(*)` })
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
        .where(filters);

      const found = foundRows[0].count;

      const organizations = await db
        .select({
          ...getTableColumns(organizationsTable),
          addedUsername: addedBy.username,
          editedUsername: editedBy.username,
          removedUsername: removedBy.username,
          countryName: countriesTable.name,
          cityName: citiesTable.name,
          districtName: districtsTable.name,
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
        .where(filters)
        .orderBy(orderBy)
        .limit(take)
        .offset((page - 1) * take);

      return {
        organizations,
        total,
        found,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
