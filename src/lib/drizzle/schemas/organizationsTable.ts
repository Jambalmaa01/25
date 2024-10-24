import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { countriesTable } from './countriesTable';
import { citiesTable } from './citiesTable';
import { districtsTable } from './districtsTable';
import { geom } from '../datatypes/geomDatatype';
import { usersTable } from './usersTable';

export const organizationsTable = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  codeName: varchar('code_name', { length: 255 }).notNull().unique(),
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

  addedAt: timestamp('added_at').notNull(),
  editedAt: timestamp('edited_at'),
  removedAt: timestamp('removed_at'),

  addedBy: uuid('added_by')
    .references(() => usersTable.id)
    .notNull(),
  editedBy: uuid('edited_by').references(() => usersTable.id),
  removedBy: uuid('removed_by').references(() => usersTable.id),
});

export type OrganizationTable = typeof organizationsTable.$inferSelect;
export type OrganizationTableInsert = typeof organizationsTable.$inferInsert;
