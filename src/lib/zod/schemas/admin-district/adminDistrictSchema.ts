import { z } from 'zod';

export const adminDistrictSchema = z.object({
  districtId: z.string(),
});

export type AdminDistrictSchema = z.infer<typeof adminDistrictSchema>;
