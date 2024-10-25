import { z } from 'zod';

export const adminCountryAddSchema = z.object({
  name: z.string().min(1, 'Нэр хоосон байж болохгүй'),
  codeName: z.string().min(1, 'Код хоосон байж болохгүй'),
});

export type AdminCountryAddSchema = z.infer<typeof adminCountryAddSchema>;

export const adminCountryAddSchemaDefaultValues: AdminCountryAddSchema = {
  name: '',
  codeName: '',
};
