import { z } from 'zod';
import {
  adminCountriesDefaultPage,
  adminCountriesDefaultSearch,
  adminCountriesDefaultTake,
  adminCountriesEndDate,
  adminCountriesSortableColumns,
  adminCountriesSortColumn,
  adminCountriesSortDirection,
  adminCountriesStartDate,
} from '@/configs';
import { sortDirectionSchema } from './sortDirectionSchema';

export const adminCountriesSchema = z.object({
  search: z.string().default(adminCountriesDefaultSearch),
  page: z.number().default(adminCountriesDefaultPage),
  take: z.number().default(adminCountriesDefaultTake),
  sortColumn: z
    .enum(adminCountriesSortableColumns)
    .default(adminCountriesSortColumn),
  sortDirection: sortDirectionSchema.default(adminCountriesSortDirection),
  startDate: z.number().default(adminCountriesStartDate),
  endDate: z.number().default(adminCountriesEndDate),
});

export type AdminCountriesSchema = z.infer<typeof adminCountriesSchema>;
