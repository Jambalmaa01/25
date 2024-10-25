import { adminCitySchema } from '@/lib/zod';
import { publicProcedure } from '../../procedures';
import {
  aliasedTable,
  citiesTable,
  countriesTable,
  getTableColumns,
  usersTable,
} from '@/lib/drizzle';
import { TRPCError } from '@trpc/server';
import { tRPCException } from '../../exception';
import { db, eq } from '@/lib/drizzle';

export const adminCityQuery = publicProcedure
  .input(adminCitySchema)
  .query(async ({ input }) => {
    try {
      const { cityId } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

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
        .where(eq(citiesTable.id, cityId));

      const city = cities[0];

      if (!city) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Олдсонгүй',
        });
      }

      return {
        city,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
