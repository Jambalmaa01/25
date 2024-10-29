import { z } from 'zod';

export const adminOrganizationSchema = z.object({
  organizationId: z.string(),
});

export type AdminOrganizationSchema = z.infer<typeof adminOrganizationSchema>;
