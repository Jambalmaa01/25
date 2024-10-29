import { pgEnum } from 'drizzle-orm/pg-core';

export const zones = [
  '',
  'Ой тайга',
  'Уулын',
  'Төвийн',
  'Говь цөл',
  'Тал хээр',
] as const;

export type ZoneEnum = (typeof zones)[number];

export const zonesEnum = pgEnum('zones', zones);
