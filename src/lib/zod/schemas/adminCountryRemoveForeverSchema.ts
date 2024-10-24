import { z } from 'zod';

export const adminCountryRemoveForeverSchema = z.object({
  countryIds: z
    .array(z.string().length(36, 'Улсын таних тэмдэг хоосон байж болохгүй'))
    .min(1, 'Улсын таних тэмдэг хоосон байж болохгүй'),
  token: z.string().min(1, 'Токен хоосон байж болохгүй'),
});

export type AdminCountryRemoveForeverSchema = z.infer<
  typeof adminCountryRemoveForeverSchema
>;

export const adminCountryRemoveForeverSchemaDefaultValues: AdminCountryRemoveForeverSchema =
  {
    countryIds: [],
    token: '',
  };
