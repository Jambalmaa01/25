import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './usersTable';

export const rolesTable = pgTable('roles', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  codeName: varchar('code_name', { length: 255 }).notNull().unique(),

  addedAt: timestamp('added_at').notNull(),
  editedAt: timestamp('edited_at'),
  removedAt: timestamp('removed_at'),

  addedBy: uuid('added_by').references(() => usersTable.id),
  editedBy: uuid('edited_by').references(() => usersTable.id),
  removedBy: uuid('removed_by').references(() => usersTable.id),
});

export type RoleTable = typeof rolesTable.$inferSelect;
export type RoleTableInsert = typeof rolesTable.$inferInsert;
