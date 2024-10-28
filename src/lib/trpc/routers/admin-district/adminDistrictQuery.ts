import { adminDistrictSchema } from '@/lib/zod';
import { publicProcedure } from '../../procedures';
import {
  aliasedTable,
  districtsTable,
  countriesTable,
  getTableColumns,
  usersTable,
  citiesTable,
} from '@/lib/drizzle';
import { TRPCError } from '@trpc/server';
import { tRPCException } from '../../exception';
import { db, eq } from '@/lib/drizzle';

export const adminDistrictQuery = publicProcedure
  .input(adminDistrictSchema)
  .query(async ({ input }) => {
    try {
      const { districtId } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

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
        .where(eq(districtsTable.id, districtId));

      const district = districts[0];

      if (!district) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Олдсонгүй',
        });
      }

      return {
        district,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
