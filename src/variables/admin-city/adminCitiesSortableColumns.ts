export const adminCitiesSortableColumns = [
  'id',
  'name',
  'codeName',
  'addedAt',
  'editedAt',
  'removedAt',
  'addedUsername',
  'editedUsername',
  'removedUsername',
  'countryName',
] as const;

export type AdminCitiesSortableColumn =
  (typeof adminCitiesSortableColumns)[number];
