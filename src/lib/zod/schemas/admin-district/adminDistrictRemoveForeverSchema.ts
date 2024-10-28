import { z } from 'zod';

export const adminDistrictRemoveForeverSchema = z.object({
  districtIds: z
    .array(z.string().length(36, 'Дугаар хоосон байж болохгүй'))
    .min(1, 'Дугаар хоосон байж болохгүй'),
  token: z.string().min(1, 'Токен хоосон байж болохгүй'),
});

export type AdminDistrictRemoveForeverSchema = z.infer<
  typeof adminDistrictRemoveForeverSchema
>;

export const adminDistrictRemoveForeverSchemaDefaultValues: AdminDistrictRemoveForeverSchema =
  {
    districtIds: [],
    token: '',
  };
