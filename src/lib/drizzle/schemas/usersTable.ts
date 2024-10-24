import {
  AnyPgColumn,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { employeesTable } from './employeesTable';
import { rolesTable } from './rolesTable';

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  username: varchar('username', { length: 36 }).notNull().unique(),
  password: varchar('password', { length: 1024 }).notNull(),

  employeeId: uuid('employee_id').references(
    (): AnyPgColumn => employeesTable.id
  ),
  roleId: uuid('role_id')
    .references((): AnyPgColumn => rolesTable.id)
    .notNull(),

  addedAt: timestamp('added_at').notNull(),
  editedAt: timestamp('edited_at'),
  removedAt: timestamp('removed_at'),

  addedBy: uuid('added_by').references((): AnyPgColumn => usersTable.id),
  editedBy: uuid('edited_by').references((): AnyPgColumn => usersTable.id),
  removedBy: uuid('removed_by').references((): AnyPgColumn => usersTable.id),
});

export type UserTable = typeof usersTable.$inferSelect;
export type UserTableInsert = typeof usersTable.$inferInsert;
