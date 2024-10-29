import { z } from 'zod';

export const adminDepartmentRemoveForeverSchema = z.object({
  departmentIds: z
    .array(z.string().length(36, 'Дугаар хоосон байж болохгүй'))
    .min(1, 'Дугаар хоосон байж болохгүй'),
  token: z.string().min(1, 'Токен хоосон байж болохгүй'),
});

export type AdminDepartmentRemoveForeverSchema = z.infer<
  typeof adminDepartmentRemoveForeverSchema
>;

export const adminDepartmentRemoveForeverSchemaDefaultValues: AdminDepartmentRemoveForeverSchema =
  {
    departmentIds: [],
    token: '',
  };
