import { pgTable, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { citiesTable } from './citiesTable';
import { usersTable } from './usersTable';
import { countriesTable } from './countriesTable';

export const districtsTable = pgTable(
  'districts',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    codeName: varchar('code_name', { length: 255 }).notNull(),

    countryId: uuid('country_id')
      .references(() => countriesTable.id)
      .notNull(),
    cityId: uuid('city_id')
      .references(() => citiesTable.id)
      .notNull(),

    addedAt: timestamp('added_at').notNull(),
    editedAt: timestamp('edited_at'),
    removedAt: timestamp('removed_at'),

    addedBy: uuid('added_by')
      .references(() => usersTable.id)
      .notNull(),
    editedBy: uuid('edited_by').references(() => usersTable.id),
    removedBy: uuid('removed_by').references(() => usersTable.id),
  },
  ({ countryId, cityId, name }) => ({
    districtNameUniqueIdx: unique('district_name_unique_idx').on(
      countryId,
      cityId,
      name
    ),
  })
);

export type DistrictTable = typeof districtsTable.$inferSelect;
export type DistrictTableInsert = typeof districtsTable.$inferInsert;
