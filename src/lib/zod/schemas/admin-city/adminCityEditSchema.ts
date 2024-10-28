import { z } from 'zod';
import { adminCityAddSchema } from './adminCityAddSchema';

export const adminCityEditSchema = adminCityAddSchema.extend({
  cityId: z.string().length(36, 'Дугаар хоосон байж болохгүй'),
});

export type AdminCityEditSchema = z.infer<typeof adminCityEditSchema>;

export const adminCityEditSchemaDefaultValues: AdminCityEditSchema = {
  cityId: '',
  name: '',
  codeName: '',
  countryId: '',
};
