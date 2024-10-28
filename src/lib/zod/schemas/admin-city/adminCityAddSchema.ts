import { countryMongoliaId } from '@/lib/drizzle/seed/vars';
import { z } from 'zod';

export const adminCityAddSchema = z.object({
  name: z.string().min(1, 'Нэр хоосон байж болохгүй'),
  codeName: z.string().min(1, 'Код хоосон байж болохгүй'),
  countryId: z.string().length(36, 'Улс хоосон байж болохгүй'),
});

export type AdminCityAddSchema = z.infer<typeof adminCityAddSchema>;

export const adminCityAddSchemaDefaultValues: AdminCityAddSchema = {
  name: '',
  codeName: '',
  countryId: countryMongoliaId,
};
