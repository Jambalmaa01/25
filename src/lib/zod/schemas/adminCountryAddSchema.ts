import { z } from 'zod';

export const adminCountryAddSchema = z.object({
  name: z.string().min(1, 'Улсын нэр хоосон байж болохгүй'),
  codeName: z.string().min(1, 'Кодын нэр хоосон байж болохгүй'),
});

export type AdminCountryAddSchema = z.infer<typeof adminCountryAddSchema>;

export const adminCountryAddSchemaDefaultValues: AdminCountryAddSchema = {
  name: '',
  codeName: '',
};
