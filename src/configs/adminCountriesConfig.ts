import { SortDirection } from '@/variables';

export const adminCountriesDefaultPage: number = 1;
export const adminCountriesDefaultTake: number = 10;
export const adminCountriesDefaultSearch: string = '';
export const adminCountriesSortableColumns = [
  'id',
  'name',
  'codeName',
  'addedAt',
  'editedAt',
  'removedAt',
  'addedUsername',
  'editedUsername',
  'removedUsername',
] as const;

export type AdminCountriesSortableColumn =
  (typeof adminCountriesSortableColumns)[number];

export const adminCountriesSortColumn: AdminCountriesSortableColumn = 'name';
export const adminCountriesSortDirection: SortDirection = 'asc';

export const adminCountriesStartDate: number = 0;
export const adminCountriesEndDate: number = 0;
