import { adminDepartmentsSchema } from '@/lib/zod';
import { adminProcedure } from '../../procedures';
import {
  aliasedTable,
  and,
  asc,
  between,
  departmentsTable,
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
  organizationsTable,
} from '@/lib/drizzle';
import { tRPCException } from '../../exception';
import {
  adminDepartmentsDefaultPage,
  adminDepartmentsDefaultSearch,
  adminDepartmentsDefaultTake,
  adminDepartmentsEndDate,
  adminDepartmentsSortColumn,
  adminDepartmentsSortDirection,
  adminDepartmentsStartDate,
} from '@/variables';
import { isUUID } from '@/utils';

export const adminDepartmentsQuery = adminProcedure
  .input(adminDepartmentsSchema)
  .query(async ({ input }) => {
    try {
      const {
        page = adminDepartmentsDefaultPage,
        take = adminDepartmentsDefaultTake,
        search = adminDepartmentsDefaultSearch,
        sortColumn = adminDepartmentsSortColumn,
        sortDirection = adminDepartmentsSortDirection,
        startDate = adminDepartmentsStartDate,
        endDate = adminDepartmentsEndDate,
      } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

      const searchFilter = search
        ? or(
            isUUID(search) ? eq(departmentsTable.id, search) : undefined,
            ilike(departmentsTable.name, `%${search}%`),
            ilike(departmentsTable.codeName, `%${search}%`),
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
              departmentsTable.addedAt,
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
          : sortColumn === 'organizationName'
          ? sortDirection === 'asc'
            ? asc(organizationsTable.name)
            : desc(organizationsTable.name)
          : sortDirection === 'asc'
          ? asc(departmentsTable[sortColumn])
          : desc(departmentsTable[sortColumn]);

      const total = await db.$count(departmentsTable);

      const foundRows = await db
        .select({ count: sql<number>`count(*)` })
        .from(departmentsTable)
        .leftJoin(addedBy, eq(addedBy.id, departmentsTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, departmentsTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, departmentsTable.removedBy))
        .leftJoin(
          countriesTable,
          eq(countriesTable.id, departmentsTable.countryId)
        )
        .leftJoin(citiesTable, eq(citiesTable.id, departmentsTable.cityId))
        .leftJoin(
          districtsTable,
          eq(districtsTable.id, departmentsTable.districtId)
        )
        .leftJoin(
          organizationsTable,
          eq(organizationsTable.id, departmentsTable.organizationId)
        )
        .where(filters);

      const found = foundRows[0].count;

      const departments = await db
        .select({
          ...getTableColumns(departmentsTable),
          addedUsername: addedBy.username,
          editedUsername: editedBy.username,
          removedUsername: removedBy.username,
          countryName: countriesTable.name,
          cityName: citiesTable.name,
          districtName: districtsTable.name,
          organizationName: organizationsTable.name,
        })
        .from(departmentsTable)
        .leftJoin(addedBy, eq(addedBy.id, departmentsTable.addedBy))
        .leftJoin(editedBy, eq(editedBy.id, departmentsTable.editedBy))
        .leftJoin(removedBy, eq(removedBy.id, departmentsTable.removedBy))
        .leftJoin(
          countriesTable,
          eq(countriesTable.id, departmentsTable.countryId)
        )
        .leftJoin(citiesTable, eq(citiesTable.id, departmentsTable.cityId))
        .leftJoin(
          districtsTable,
          eq(districtsTable.id, departmentsTable.districtId)
        )
        .leftJoin(
          organizationsTable,
          eq(organizationsTable.id, departmentsTable.organizationId)
        )
        .where(filters)
        .orderBy(orderBy)
        .limit(take)
        .offset((page - 1) * take);

      return {
        departments,
        total,
        found,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
