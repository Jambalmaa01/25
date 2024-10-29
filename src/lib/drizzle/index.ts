import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schemas';
import 'dotenv/config';

// declare global {
//   // eslint-disable-next-line no-var
//   var db: NodePgDatabase<typeof schema>;
// }

// let db: NodePgDatabase<typeof schema>;

// const databaseURL = process.env.DATABASE_URL;

// if (!databaseURL) throw new Error('DATABASE_URL empty');

// if (process.env.NODE_ENV === 'production') {
//   db = drizzle(postgres(databaseURL), { schema, logger: true });
// } else {
//   if (!global.db) global.db = drizzle(postgres(databaseURL), { schema });

//   db = global.db;
// }

// export { db };

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export * from 'drizzle-orm';
export * from './schemas';
