import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from './usersTable';

export const positionsTable = pgTable('positions', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  codeName: varchar('code_name', { length: 255 }).notNull().unique(),

  addedAt: timestamp('added_at').notNull(),
  editedAt: timestamp('edited_at'),
  removedAt: timestamp('removed_at'),

  addedBy: uuid('added_by')
    .references(() => usersTable.id)
    .notNull(),
  editedBy: uuid('edited_by').references(() => usersTable.id),
  removedBy: uuid('removed_by').references(() => usersTable.id),
});

export type PositionTable = typeof positionsTable.$inferSelect;
export type PositionTableInsert = typeof positionsTable.$inferInsert;
