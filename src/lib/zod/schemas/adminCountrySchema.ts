import { z } from 'zod';

export const adminCountrySchema = z.object({
  countryId: z.string(),
});

export type AdminCountrySchema = z.infer<typeof adminCountrySchema>;
