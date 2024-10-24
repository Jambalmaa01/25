import { defineConfig } from 'drizzle-kit';

const databaseURL = process.env.DATABASE_URL;

if (!databaseURL) throw new Error('DATABASE_URL empty');

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/lib/drizzle/schemas/index.ts',
  out: './src/lib/drizzle/migrations',
  dbCredentials: {
    url: databaseURL,
  },
  extensionsFilters: ['postgis'],
});
