import { adminCitiesSchema } from '@/lib/zod';
import { adminProcedure } from '../../procedures';
import {
  aliasedTable,
  and,
  asc,
  between,
  citiesTable,
  countriesTable,
  db,
  desc,
  eq,
  getTableColumns,
  ilike,
  or,
  sql,
  usersTable,
} from '@/lib/drizzle';
import { tRPCException } from '../../exception';
import {
  adminCitiesDefaultPage,
  adminCitiesDefaultSearch,
  adminCitiesDefaultTake,
  adminCitiesEndDate,
  adminCitiesSortColumn,
  adminCitiesSortDirection,
  adminCitiesStartDate,
} from '@/variables';
import { isUUID } from '@/utils';

export const adminCitiesQuery = adminProcedure
  .input(adminCitiesSchema)
  .query(async ({ input }) => {
    try {
      const {
        page = adminCitiesDefaultPage,
        take = adminCitiesDefaultTake,
        search = adminCitiesDefaultSearch,
        sortColumn = adminCitiesSortColumn,
        sortDirection = adminCitiesSortDirection,
        startDate = adminCitiesStartDate,
        endDate = adminCitiesEndDate,
      } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

      const searchFilter = search
        ? or(
            isUUID(search) ? eq(citiesTable.id, search) : undefined,
            ilike(citiesTable.name, `%${search}%`),
            ilike(citiesTable.codeName, `%${search}%`),
            ilike(addedBy.username, `%${search}%`),
            ilike(editedBy.username, `%${search}%`),
            ilike(removedBy.username, `%${search}%`),
            ilike(countriesTable.name, `%${search}%`)
          )
        : undefined;

      const dateFilter =
        startDate && endDate
          ? between(citiesTable.addedAt, new Date(startDate), new Date(endDate))
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
          : sortDirection === 'asc'
          ? asc(citiesTable[sortColumn])
          : desc(citiesTable[sortColumn]);

      const total = await db.$count(citiesTable);

      const foundRows = await db
        .select({ count: sql<number>`count(*)` })
        .from(citiesTable)
        .leftJoin(addedBy, eq(addedBy.id, citiesTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, citiesTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, citiesTable.removedBy))
        .leftJoin(countriesTable, eq(countriesTable.id, citiesTable.countryId))
        .where(filters);

      const found = foundRows[0].count;

      const cities = await db
        .select({
          ...getTableColumns(citiesTable),
          addedUsername: addedBy.username,
          editedUsername: editedBy.username,
          removedUsername: removedBy.username,
          countryName: countriesTable.name,
        })
        .from(citiesTable)
        .leftJoin(addedBy, eq(addedBy.id, citiesTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, citiesTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, citiesTable.removedBy))
        .leftJoin(countriesTable, eq(countriesTable.id, citiesTable.countryId))
        .where(filters)
        .orderBy(orderBy)
        .limit(take)
        .offset((page - 1) * take);

      return {
        cities,
        total,
        found,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
