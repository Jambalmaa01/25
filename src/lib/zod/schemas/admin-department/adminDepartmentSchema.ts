import { z } from 'zod';

export const adminDepartmentSchema = z.object({
  departmentId: z.string(),
});

export type AdminDepartmentSchema = z.infer<typeof adminDepartmentSchema>;
