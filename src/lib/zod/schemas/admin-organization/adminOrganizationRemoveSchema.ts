import { z } from 'zod';

export const adminOrganizationRemoveSchema = z.object({
  organizationIds: z
    .array(z.string().length(36, 'Дугаар хоосон байж болохгүй'))
    .min(1, 'Дугаар хоосон байж болохгүй'),
});

export type AdminOrganizationRemoveSchema = z.infer<
  typeof adminOrganizationRemoveSchema
>;

export const adminOrganizationRemoveSchemaDefaultValues: AdminOrganizationRemoveSchema =
  {
    organizationIds: [],
  };
