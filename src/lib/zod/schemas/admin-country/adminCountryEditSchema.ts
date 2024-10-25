import { z } from 'zod';
import { adminCountryAddSchema } from './adminCountryAddSchema';

export const adminCountryEditSchema = adminCountryAddSchema.extend({
  countryId: z.string().length(36, 'Дугаар хоосон байж болохгүй'),
});

export type AdminCountryEditSchema = z.infer<typeof adminCountryEditSchema>;

export const adminCountryEditSchemaDefaultValues: AdminCountryEditSchema = {
  countryId: '',
  name: '',
  codeName: '',
};
