import { z } from 'zod';

export const adminOrganizationRemoveForeverSchema = z.object({
  organizationIds: z
    .array(z.string().length(36, 'Дугаар хоосон байж болохгүй'))
    .min(1, 'Дугаар хоосон байж болохгүй'),
  token: z.string().min(1, 'Токен хоосон байж болохгүй'),
});

export type AdminOrganizationRemoveForeverSchema = z.infer<
  typeof adminOrganizationRemoveForeverSchema
>;

export const adminOrganizationRemoveForeverSchemaDefaultValues: AdminOrganizationRemoveForeverSchema =
  {
    organizationIds: [],
    token: '',
  };
