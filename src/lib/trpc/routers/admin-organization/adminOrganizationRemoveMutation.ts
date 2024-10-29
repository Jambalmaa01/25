import { adminOrganizationRemoveSchema } from '@/lib/zod';
import { organizationsTable, db, inArray } from '@/lib/drizzle';
import { adminProcedure } from '../../procedures';
import { tRPCException } from '../../exception';

export const adminOrganizationRemoveMutation = adminProcedure
  .input(adminOrganizationRemoveSchema)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const { organizationIds } = input;

      const organizations = await db.transaction(async tx => {
        const organizations = await tx
          .update(organizationsTable)
          .set({
            removedAt: new Date(),
            removedBy: user.id,
          })
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
