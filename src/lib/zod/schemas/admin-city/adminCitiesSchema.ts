import { z } from 'zod';
import {
  adminCitiesDefaultPage,
  adminCitiesDefaultSearch,
  adminCitiesDefaultTake,
  adminCitiesEndDate,
  adminCitiesSortableColumns,
  adminCitiesSortColumn,
  adminCitiesSortDirection,
  adminCitiesStartDate,
} from '@/variables';
import { sortDirectionSchema } from '../sortDirectionSchema';

export const adminCitiesSchema = z.object({
  search: z.string().default(adminCitiesDefaultSearch),
  page: z.number().default(adminCitiesDefaultPage),
  take: z.number().default(adminCitiesDefaultTake),
  sortColumn: z.enum(adminCitiesSortableColumns).default(adminCitiesSortColumn),
  sortDirection: sortDirectionSchema.default(adminCitiesSortDirection),
  startDate: z.number().default(adminCitiesStartDate),
  endDate: z.number().default(adminCitiesEndDate),
});

export type AdminCitiesSchema = z.infer<typeof adminCitiesSchema>;
