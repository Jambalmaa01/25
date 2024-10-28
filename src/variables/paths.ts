export const paths = [
  '/',
  '/admin',
  '/admin/countries',
  '/admin/countries/add',
  '/admin/countries/[:countryId]',
  '/admin/countries/[:countryId]/edit',
  '/admin/countries/[:countryId]/remove',
  '/admin/countries/[:countryId]/remove-forever',
  '/admin/cities',
  '/admin/cities/add',
  '/admin/cities/[:cityId]',
  '/admin/cities/[:cityId]/edit',
  '/admin/cities/[:cityId]/remove',
  '/admin/cities/[:cityId]/remove-forever',
  '/admin/districts',
  '/admin/districts/add',
  '/admin/districts/[:districtId]',
  '/admin/districts/[:districtId]/edit',
  '/admin/districts/[:districtId]/remove',
  '/admin/districts/[:districtId]/remove-forever',
] as const;

export type Path = (typeof paths)[number];
