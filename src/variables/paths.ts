export const paths = [
  '/',
  '/admin',
  '/admin/countries',
  '/admin/countries/add',
  '/admin/countries/[:countryId]',
  '/admin/countries/[:countryId]/edit',
  '/admin/countries/[:countryId]/remove',
  '/admin/countries/[:countryId]/remove-forever',
] as const;

export type Path = (typeof paths)[number];
