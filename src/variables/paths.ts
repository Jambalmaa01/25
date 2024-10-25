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
] as const;

export type Path = (typeof paths)[number];
