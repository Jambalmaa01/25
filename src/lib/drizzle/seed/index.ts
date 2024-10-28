import {
  citiesTable,
  countriesTable,
  departmentsTable,
  districtsTable,
  employeeMovementsTable,
  employeesTable,
  organizationsTable,
  positionsTable,
  rankGroupsTable,
  ranksTable,
  rolesTable,
  usersTable,
} from '../schemas';
import { db, eq } from '..';
import { rolesSeed } from './rolesSeed';
import { usersSeed } from './usersSeed';
import { countriesSeed } from './countriesSeed';
import { citiesSeed } from './citiesSeed';
import { districtsSeed } from './districtsSeed';
import { rankGroupsSeed } from './rankGroupsSeed';
import { ranksSeed } from './ranksSeed';
import { employeesSeed } from './employeesSeed';
import { positionsSeed } from './positionsSeed';
import { organizationsSeed } from './organizationsSeed';
import { departmentsSeed } from './departmentsSeed';
import { employeeMovementsSeed } from './employeeMovementsSeed';
import { toumkuEmployeeId, userToumkuId } from './vars';

async function seed() {
  await db.transaction(async tx => {
    await tx.insert(rolesTable).values(rolesSeed).onConflictDoNothing();
    await tx.insert(usersTable).values(usersSeed).onConflictDoNothing();
    await tx.insert(countriesTable).values(countriesSeed).onConflictDoNothing();
    await tx.insert(citiesTable).values(citiesSeed).onConflictDoNothing();
    await tx.insert(districtsTable).values(districtsSeed).onConflictDoNothing();
    await tx
      .insert(rankGroupsTable)
      .values(rankGroupsSeed)
      .onConflictDoNothing();
    await tx.insert(ranksTable).values(ranksSeed).onConflictDoNothing();
    await tx
      .insert(organizationsTable)
      .values(organizationsSeed)
      .onConflictDoNothing();
    await tx
      .insert(departmentsTable)
      .values(departmentsSeed)
      .onConflictDoNothing();
    await tx.insert(positionsTable).values(positionsSeed).onConflictDoNothing();
    await tx.insert(employeesTable).values(employeesSeed).onConflictDoNothing();
    await tx
      .insert(employeeMovementsTable)
      .values(employeeMovementsSeed)
      .onConflictDoNothing();
    await tx
      .update(usersTable)
      .set({ employeeId: toumkuEmployeeId })
      .where(eq(usersTable.id, userToumkuId));
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
