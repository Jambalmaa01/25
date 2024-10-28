import { z } from 'zod';
import {
  adminDistrictsDefaultPage,
  adminDistrictsDefaultSearch,
  adminDistrictsDefaultTake,
  adminDistrictsEndDate,
  adminDistrictsSortableColumns,
  adminDistrictsSortColumn,
  adminDistrictsSortDirection,
  adminDistrictsStartDate,
} from '@/variables';
import { sortDirectionSchema } from '../sortDirectionSchema';

export const adminDistrictsSchema = z.object({
  search: z.string().default(adminDistrictsDefaultSearch),
  page: z.number().default(adminDistrictsDefaultPage),
  take: z.number().default(adminDistrictsDefaultTake),
  sortColumn: z
    .enum(adminDistrictsSortableColumns)
    .default(adminDistrictsSortColumn),
  sortDirection: sortDirectionSchema.default(adminDistrictsSortDirection),
  startDate: z.number().default(adminDistrictsStartDate),
  endDate: z.number().default(adminDistrictsEndDate),
});

export type AdminDistrictsSchema = z.infer<typeof adminDistrictsSchema>;
