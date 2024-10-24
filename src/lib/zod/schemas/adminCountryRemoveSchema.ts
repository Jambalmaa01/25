import { z } from 'zod';

export const adminCountryRemoveSchema = z.object({
  countryIds: z
    .array(z.string().length(36, 'Улсын таних тэмдэг хоосон байж болохгүй'))
    .min(1, 'Улсын таних тэмдэг хоосон байж болохгүй'),
});

export type AdminCountryRemoveSchema = z.infer<typeof adminCountryRemoveSchema>;

export const adminCountryRemoveSchemaDefaultValues: AdminCountryRemoveSchema = {
  countryIds: [],
};
