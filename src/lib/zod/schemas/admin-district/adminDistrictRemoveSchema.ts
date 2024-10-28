import { z } from 'zod';

export const adminDistrictRemoveSchema = z.object({
  districtIds: z
    .array(z.string().length(36, 'Дугаар хоосон байж болохгүй'))
    .min(1, 'Дугаар хоосон байж болохгүй'),
});

export type AdminDistrictRemoveSchema = z.infer<
  typeof adminDistrictRemoveSchema
>;

export const adminDistrictRemoveSchemaDefaultValues: AdminDistrictRemoveSchema =
  {
    districtIds: [],
  };
