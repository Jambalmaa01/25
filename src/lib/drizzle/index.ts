import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas';
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import 'dotenv/config';

declare global {
  // eslint-disable-next-line no-var
  var db: PostgresJsDatabase<typeof schema>;
}

let db: PostgresJsDatabase<typeof schema>;

const databaseURL = process.env.DATABASE_URL;

if (!databaseURL) throw new Error('DATABASE_URL empty');

if (process.env.NODE_ENV === 'production') {
  db = drizzle(postgres(databaseURL), { schema, logger: true });
} else {
  if (!global.db) global.db = drizzle(postgres(databaseURL), { schema });

  db = global.db;
}

export { db };

export * from 'drizzle-orm';
export * from './schemas';
