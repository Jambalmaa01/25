export const adminDistrictsSortableColumns = [
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
  'cityName',
] as const;

export type AdminDistrictsSortableColumn =
  (typeof adminDistrictsSortableColumns)[number];
