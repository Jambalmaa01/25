import { countryMongoliaId } from '@/lib/drizzle/seed/vars';
import { z } from 'zod';

export const adminDistrictAddSchema = z.object({
  name: z.string().min(1, 'Нэр хоосон байж болохгүй'),
  codeName: z.string().min(1, 'Код хоосон байж болохгүй'),
  countryId: z.string().length(36, 'Улс хоосон байж болохгүй'),
  cityId: z.string().length(36, 'Хот/Аймаг хоосон байж болохгүй'),
});

export type AdminDistrictAddSchema = z.infer<typeof adminDistrictAddSchema>;

export const adminDistrictAddSchemaDefaultValues: AdminDistrictAddSchema = {
  name: '',
  codeName: '',
  countryId: countryMongoliaId,
  cityId: '',
};
