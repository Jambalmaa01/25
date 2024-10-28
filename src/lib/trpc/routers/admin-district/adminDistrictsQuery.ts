import { adminDistrictsSchema } from '@/lib/zod';
import { adminProcedure } from '../../procedures';
import {
  aliasedTable,
  and,
  asc,
  between,
  districtsTable,
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
} from '@/lib/drizzle';
import { tRPCException } from '../../exception';
import {
  adminDistrictsDefaultPage,
  adminDistrictsDefaultSearch,
  adminDistrictsDefaultTake,
  adminDistrictsEndDate,
  adminDistrictsSortColumn,
  adminDistrictsSortDirection,
  adminDistrictsStartDate,
} from '@/variables';
import { isUUID } from '@/utils';

export const adminDistrictsQuery = adminProcedure
  .input(adminDistrictsSchema)
  .query(async ({ input }) => {
    try {
      const {
        page = adminDistrictsDefaultPage,
        take = adminDistrictsDefaultTake,
        search = adminDistrictsDefaultSearch,
        sortColumn = adminDistrictsSortColumn,
        sortDirection = adminDistrictsSortDirection,
        startDate = adminDistrictsStartDate,
        endDate = adminDistrictsEndDate,
      } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

      const searchFilter = search
        ? or(
            isUUID(search) ? eq(districtsTable.id, search) : undefined,
            ilike(districtsTable.name, `%${search}%`),
            ilike(districtsTable.codeName, `%${search}%`),
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
              districtsTable.addedAt,
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
          : sortDirection === 'asc'
          ? asc(districtsTable[sortColumn])
          : desc(districtsTable[sortColumn]);

      const total = await db.$count(districtsTable);

      const foundRows = await db
        .select({ count: sql<number>`count(*)` })
        .from(districtsTable)
        .leftJoin(addedBy, eq(addedBy.id, districtsTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, districtsTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, districtsTable.removedBy))
        .leftJoin(
          countriesTable,
          eq(countriesTable.id, districtsTable.countryId)
        )
        .leftJoin(citiesTable, eq(citiesTable.id, districtsTable.cityId))
        .where(filters);

      const found = foundRows[0].count;

      const districts = await db
        .select({
          ...getTableColumns(districtsTable),
          addedUsername: addedBy.username,
          editedUsername: editedBy.username,
          removedUsername: removedBy.username,
          countryName: countriesTable.name,
          cityName: citiesTable.name,
        })
        .from(districtsTable)
        .leftJoin(addedBy, eq(addedBy.id, districtsTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, districtsTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, districtsTable.removedBy))
        .leftJoin(
          countriesTable,
          eq(countriesTable.id, districtsTable.countryId)
        )
        .leftJoin(citiesTable, eq(citiesTable.id, districtsTable.cityId))
        .where(filters)
        .orderBy(orderBy)
        .limit(take)
        .offset((page - 1) * take);

      return {
        districts,
        total,
        found,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
