import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { rankGroupsTable } from './rankGroupsTable';
import { usersTable } from './usersTable';

export const ranksTable = pgTable('ranks', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  shortName: varchar('short_name', { length: 255 }).notNull(),
  codeName: varchar('code_name', { length: 255 }).notNull().unique(),

  rankGroupId: uuid('rank_group_id')
    .references(() => rankGroupsTable.id)
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

export type RankTable = typeof ranksTable.$inferSelect;
export type RankTableInsert = typeof ranksTable.$inferInsert;
