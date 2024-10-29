import { adminDepartmentSchema } from '@/lib/zod';
import { publicProcedure } from '../../procedures';
import {
  aliasedTable,
  departmentsTable,
  countriesTable,
  getTableColumns,
  usersTable,
  citiesTable,
  districtsTable,
  sql,
  organizationsTable,
} from '@/lib/drizzle';
import { TRPCError } from '@trpc/server';
import { tRPCException } from '../../exception';
import { db, eq } from '@/lib/drizzle';

export const adminDepartmentQuery = publicProcedure
  .input(adminDepartmentSchema)
  .query(async ({ input }) => {
    try {
      const { departmentId } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

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
          x: sql<number>`ST_X(${departmentsTable.geometry})`,
          y: sql<number>`ST_Y(${departmentsTable.geometry})`,
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
        .where(eq(departmentsTable.id, departmentId));

      const department = departments[0];

      if (!department) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Олдсонгүй',
        });
      }

      return {
        department,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
