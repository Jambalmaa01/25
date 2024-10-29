import { z } from 'zod';
import {
  adminDepartmentsDefaultPage,
  adminDepartmentsDefaultSearch,
  adminDepartmentsDefaultTake,
  adminDepartmentsEndDate,
  adminDepartmentsSortableColumns,
  adminDepartmentsSortColumn,
  adminDepartmentsSortDirection,
  adminDepartmentsStartDate,
} from '@/variables';
import { sortDirectionSchema } from '../sortDirectionSchema';

export const adminDepartmentsSchema = z.object({
  search: z.string().default(adminDepartmentsDefaultSearch),
  page: z.number().default(adminDepartmentsDefaultPage),
  take: z.number().default(adminDepartmentsDefaultTake),
  sortColumn: z
    .enum(adminDepartmentsSortableColumns)
    .default(adminDepartmentsSortColumn),
  sortDirection: sortDirectionSchema.default(adminDepartmentsSortDirection),
  startDate: z.number().default(adminDepartmentsStartDate),
  endDate: z.number().default(adminDepartmentsEndDate),
});

export type AdminDepartmentsSchema = z.infer<typeof adminDepartmentsSchema>;
