import { z } from 'zod';

export const adminCityRemoveSchema = z.object({
  cityIds: z
    .array(z.string().length(36, 'Дугаар хоосон байж болохгүй'))
    .min(1, 'Дугаар хоосон байж болохгүй'),
});

export type AdminCityRemoveSchema = z.infer<typeof adminCityRemoveSchema>;

export const adminCityRemoveSchemaDefaultValues: AdminCityRemoveSchema = {
  cityIds: [],
};
