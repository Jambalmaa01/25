import { date, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { rankGroupsTable } from './rankGroupsTable';
import { ranksTable } from './ranksTable';
import { employeesTable } from './employeesTable';
import { usersTable } from './usersTable';
import { organizationsTable } from './organizationsTable';
import { departmentsTable } from './departmentsTable';
import { positionsTable } from './positionsTable';

export const employeeMovementsTable = pgTable('employee_migrations', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  identityNumber: varchar('identity_number', { length: 4 }).notNull(),
  organizationCameDate: date('organization_came_date').notNull(),
  departmentCameDate: date('department_came_date').notNull(),
  organizationWentDate: date('organization_went_date'),
  departmentWentDate: date('department_went_date'),

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
  employeeId: uuid('employee_id')
    .references(() => employeesTable.id)
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

export type EmployeeMovementTable = typeof employeeMovementsTable.$inferSelect;
export type EmployeeMovementTableInsert =
  typeof employeeMovementsTable.$inferInsert;
