import { z } from 'zod';

export const adminCitySchema = z.object({
  cityId: z.string(),
});

export type AdminCitySchema = z.infer<typeof adminCitySchema>;
