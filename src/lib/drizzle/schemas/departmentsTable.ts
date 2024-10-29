import {
  boolean,
  date,
  doublePrecision,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { countriesTable } from './countriesTable';
import { citiesTable } from './citiesTable';
import { districtsTable } from './districtsTable';
import { geom } from '../datatypes/geomDatatype';
import { usersTable } from './usersTable';
import { organizationsTable } from './organizationsTable';
import { zonesEnum } from './zonesEnum';
import { directionsEnum } from './directionsEnum';

export const departmentsTable = pgTable('departments', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  codeName: varchar('code_name', { length: 255 }).notNull(),
  identityNumber: varchar('identity_number', { length: 4 }).unique(),
  geometry: geom('geom').notNull(),

  countryId: uuid('country_id')
    .references(() => countriesTable.id)
    .notNull(),
  cityId: uuid('city_id')
    .references(() => citiesTable.id)
    .notNull(),
  districtId: uuid('district_id')
    .references(() => districtsTable.id)
    .notNull(),
  organizationId: uuid('orgnaization_id')
    .references(() => organizationsTable.id)
    .notNull(),

  zone: zonesEnum('zone'),
  direction: directionsEnum('direction'),
  establishmentedDate: date('establishmented_date'),
  ranking: varchar('ranking'),
  electricPowerSource: varchar('electric_power_source'),
  beverageSource: varchar('beverage_source'),
  beverageSourceNumber: doublePrecision('beverage_source_number'),

  lengthResponsibleBorder: doublePrecision('length_responsible_border'),
  lengthDryLand: doublePrecision('length_dry_land'),
  lengthWaterBoundaryLength: doublePrecision('length_water_boundary'),

  distanceFromBorder: doublePrecision('distance_from_border'),
  distanceFromWestern: doublePrecision('distance_from_western'),
  distanceFromEastern: doublePrecision('distance_from_eastern'),
  distanceFromDetachment: doublePrecision('distance_from_detachment'),
  distanceFromDistrict: doublePrecision('distance_from_district'),

  networkMobicom: boolean('network_mobicom'),
  networkSkytel: boolean('network_skytel'),
  networkUnitel: boolean('network_unitel'),
  networkGmobile: boolean('network_gmobile'),
  networkVsat: boolean('network_vsat'),

  addedAt: timestamp('added_at').notNull(),
  editedAt: timestamp('edited_at'),
  removedAt: timestamp('removed_at'),

  addedBy: uuid('added_by')
    .references(() => usersTable.id)
    .notNull(),
  editedBy: uuid('edited_by').references(() => usersTable.id),
  removedBy: uuid('removed_by').references(() => usersTable.id),
});

export type DepartmentTable = typeof departmentsTable.$inferSelect;
export type DepartmentTableInsert = typeof departmentsTable.$inferInsert;
