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
