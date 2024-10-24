import { adminCountriesSchema } from '@/lib/zod';
import { adminProcedure } from '../../procedures';
import {
  aliasedTable,
  and,
  asc,
  between,
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
  adminCountriesDefaultPage,
  adminCountriesDefaultSearch,
  adminCountriesDefaultTake,
  adminCountriesEndDate,
  adminCountriesSortColumn,
  adminCountriesSortDirection,
  adminCountriesStartDate,
} from '@/configs';
import { isUUID } from '@/utils';

export const adminCountriesQuery = adminProcedure
  .input(adminCountriesSchema)
  .query(async ({ input }) => {
    try {
      const {
        page = adminCountriesDefaultPage,
        take = adminCountriesDefaultTake,
        search = adminCountriesDefaultSearch,
        sortColumn = adminCountriesSortColumn,
        sortDirection = adminCountriesSortDirection,
        startDate = adminCountriesStartDate,
        endDate = adminCountriesEndDate,
      } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

      const searchFilter = search
        ? or(
            isUUID(search) ? eq(countriesTable.id, search) : undefined,
            ilike(countriesTable.name, `%${search}%`),
            ilike(countriesTable.codeName, `%${search}%`),
            ilike(addedBy.username, `%${search}%`),
            ilike(editedBy.username, `%${search}%`),
            ilike(removedBy.username, `%${search}%`)
          )
        : undefined;

      const dateFilter =
        startDate && endDate
          ? between(
              countriesTable.addedAt,
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
          : sortDirection === 'asc'
          ? asc(countriesTable[sortColumn])
          : desc(countriesTable[sortColumn]);

      const total = await db.$count(countriesTable);

      const foundRows = await db
        .select({ count: sql<number>`count(*)` })
        .from(countriesTable)
        .leftJoin(addedBy, eq(addedBy.id, countriesTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, countriesTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, countriesTable.removedBy))
        .where(filters);

      const found = foundRows[0].count;

      const countries = await db
        .select({
          ...getTableColumns(countriesTable),
          addedUsername: addedBy.username,
          editedUsername: editedBy.username,
          removedUsername: removedBy.username,
        })
        .from(countriesTable)
        .leftJoin(addedBy, eq(addedBy.id, countriesTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, countriesTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, countriesTable.removedBy))
        .where(filters)
        .orderBy(orderBy)
        .limit(take)
        .offset((page - 1) * take);

      return {
        countries,
        total,
        found,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
