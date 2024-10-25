import { z } from 'zod';

export const adminCityRemoveForeverSchema = z.object({
  cityIds: z
    .array(z.string().length(36, 'Дугаар хоосон байж болохгүй'))
    .min(1, 'Дугаар хоосон байж болохгүй'),
  token: z.string().min(1, 'Токен хоосон байж болохгүй'),
});

export type AdminCityRemoveForeverSchema = z.infer<
  typeof adminCityRemoveForeverSchema
>;

export const adminCityRemoveForeverSchemaDefaultValues: AdminCityRemoveForeverSchema =
  {
    cityIds: [],
    token: '',
  };
