import { pgTable, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { countriesTable } from './countriesTable';
import { usersTable } from './usersTable';

export const citiesTable = pgTable(
  'cities',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    codeName: varchar('code_name', { length: 255 }).notNull(),

    countryId: uuid('country_id')
      .references(() => countriesTable.id)
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
  ({ countryId, name }) => ({
    cityNameUniqueIdx: unique('city_name_unique_idx').on(countryId, name),
  })
);

export type CityTable = typeof citiesTable.$inferSelect;
export type CityTableInsert = typeof citiesTable.$inferInsert;
