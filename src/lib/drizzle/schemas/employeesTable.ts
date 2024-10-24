import { date, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { countriesTable } from './countriesTable';
import { citiesTable } from './citiesTable';
import { districtsTable } from './districtsTable';
import { rankGroupsTable } from './rankGroupsTable';
import { ranksTable } from './ranksTable';
import { usersTable } from './usersTable';
import { organizationsTable } from './organizationsTable';
import { departmentsTable } from './departmentsTable';
import { positionsTable } from './positionsTable';

export const employeesTable = pgTable('employees', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  // Үндэс угсаа
  nationality: varchar('nationality', { length: 255 }).notNull(),
  familyName: varchar('family_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  birthDate: date('birth_date').notNull(),
  countryId: uuid('country_id')
    .references(() => countriesTable.id)
    .notNull(),
  cityId: uuid('city_id')
    .references(() => citiesTable.id)
    .notNull(),
  districtId: uuid('district_id')
    .references(() => districtsTable.id)
    .notNull(),
  rankGroupId: uuid('rank_group_id')
    .references(() => rankGroupsTable.id)
    .notNull(),
  rankId: uuid('rank_id')
    .references(() => ranksTable.id)
    .notNull(),
  organizationId: uuid('organization_id')
    .references(() => organizationsTable.id)
    .notNull(),
  departmentId: uuid('department_id')
    .references(() => departmentsTable.id)
    .notNull(),
  positionId: uuid('position_id')
    .references(() => positionsTable.id)
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

export type EmployeeTable = typeof employeesTable.$inferSelect;
export type EmployeeTableInsert = typeof employeesTable.$inferInsert;
