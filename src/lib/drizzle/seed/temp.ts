import { writeFile } from 'fs/promises';
import { db, departmentsTable, asc } from '..';
import { join } from 'path';
import { zastavJSON } from '../bulk/zastavJSON';

async function seed() {
  console.log(zastavJSON.features.length);
  return;
  await db.transaction(async tx => {
    const departments = await tx
      .select()
      .from(departmentsTable)
      .orderBy(asc(departmentsTable.identityNumber));

    const json = JSON.stringify(departments, null, 2);
    const path = join(process.cwd(), 'public', 'temp', 'departments.json');

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
