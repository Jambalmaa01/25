import { z } from 'zod';
import {
  adminOrganizationsDefaultPage,
  adminOrganizationsDefaultSearch,
  adminOrganizationsDefaultTake,
  adminOrganizationsEndDate,
  adminOrganizationsSortableColumns,
  adminOrganizationsSortColumn,
  adminOrganizationsSortDirection,
  adminOrganizationsStartDate,
} from '@/variables';
import { sortDirectionSchema } from '../sortDirectionSchema';

export const adminOrganizationsSchema = z.object({
  search: z.string().default(adminOrganizationsDefaultSearch),
  page: z.number().default(adminOrganizationsDefaultPage),
  take: z.number().default(adminOrganizationsDefaultTake),
  sortColumn: z
    .enum(adminOrganizationsSortableColumns)
    .default(adminOrganizationsSortColumn),
  sortDirection: sortDirectionSchema.default(adminOrganizationsSortDirection),
  startDate: z.number().default(adminOrganizationsStartDate),
  endDate: z.number().default(adminOrganizationsEndDate),
});

export type AdminOrganizationsSchema = z.infer<typeof adminOrganizationsSchema>;
