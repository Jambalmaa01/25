import { z } from 'zod';

export const adminDepartmentRemoveSchema = z.object({
  departmentIds: z
    .array(z.string().length(36, 'Дугаар хоосон байж болохгүй'))
    .min(1, 'Дугаар хоосон байж болохгүй'),
});

export type AdminDepartmentRemoveSchema = z.infer<
  typeof adminDepartmentRemoveSchema
>;

export const adminDepartmentRemoveSchemaDefaultValues: AdminDepartmentRemoveSchema =
  {
    departmentIds: [],
  };
