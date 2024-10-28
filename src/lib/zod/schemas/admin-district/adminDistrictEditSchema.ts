import { z } from 'zod';
import { adminDistrictAddSchema } from './adminDistrictAddSchema';

export const adminDistrictEditSchema = adminDistrictAddSchema.extend({
  districtId: z.string().length(36, 'Дугаар хоосон байж болохгүй'),
});

export type AdminDistrictEditSchema = z.infer<typeof adminDistrictEditSchema>;

export const adminDistrictEditSchemaDefaultValues: AdminDistrictEditSchema = {
  districtId: '',
  name: '',
  codeName: '',
  countryId: '',
  cityId: '',
};
