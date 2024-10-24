import { countriesTable } from '../schemas';
import { asc, db } from '..';
import { writeFile } from 'fs/promises';
import { join } from 'path';

async function seed() {
  await db.transaction(async tx => {
    const countries = await tx
      .select()
      .from(countriesTable)
      .orderBy(asc(countriesTable.name));

    const json = JSON.stringify(countries, null, 2);
    const path = join(process.cwd(), 'public', 'temp', 'countries.json');

    await writeFile(path, json, 'utf8');
  });
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
