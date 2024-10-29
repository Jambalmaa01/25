import { adminOrganizationRemoveForeverSchema } from '@/lib/zod';
import { organizationsTable, db, inArray } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';
import { TRPCError } from '@trpc/server';

export const adminOrganizationRemoveForeverMutation = adminProcedure
  .input(adminOrganizationRemoveForeverSchema)
  .mutation(async ({ input }) => {
    try {
      const { organizationIds, token } = input;

      if (token !== process.env.DELETE_FOREVER_TOKEN) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Токен буруу байна',
        });
      }

      const organizations = await db.transaction(async tx => {
        const organizations = await tx
          .delete(organizationsTable)
          .where(inArray(organizationsTable.id, organizationIds))
          .returning();

        return organizations;
      });

      return {
        organizations,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
