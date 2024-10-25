import { adminCountrySchema } from '@/lib/zod';
import { publicProcedure } from '../../procedures';
import {
  aliasedTable,
  countriesTable,
  getTableColumns,
  usersTable,
} from '@/lib/drizzle';
import { TRPCError } from '@trpc/server';
import { tRPCException } from '../../exception';
import { db, eq } from '@/lib/drizzle';

export const adminCountryQuery = publicProcedure
  .input(adminCountrySchema)
  .query(async ({ input }) => {
    try {
      const { countryId } = input;

      const addedBy = aliasedTable(usersTable, 'addedBy');
      const editedBy = aliasedTable(usersTable, 'editedBy');
      const removedBy = aliasedTable(usersTable, 'removedBy');

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
        .where(eq(countriesTable.id, countryId));

      const country = countries[0];

      if (!country) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Олдсонгүй',
        });
      }

      return {
        country,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
