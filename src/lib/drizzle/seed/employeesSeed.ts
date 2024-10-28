import { EmployeeTableInsert } from '../schemas';
import {
  countryMongoliaId,
  ofitserId,
  deshlegchId,
  org0165Id,
  dep0125Id,
  zastaviinDargaId,
  addedAt,
  userToumkuId,
  cityUlaanbaatarId,
  districtBaynzurhId,
} from './vars';

export type EmployeeTableSeed = Omit<EmployeeTableInsert, 'id'> & {
  id: string;
};

export const employeesSeed: EmployeeTableSeed[] = [
  {
    id: 'ee28b989-75dc-42ad-8477-4df3266b6fa9',
    lastName: 'Дэлгэрцэцэг',
    firstName: 'Төгстөгөлдөр',
    familyName: 'Засаг',
    nationality: 'Халх',
    birthDate: '1997-12-28',
    countryId: countryMongoliaId,
    cityId: cityUlaanbaatarId,
    districtId: districtBaynzurhId,
    rankGroupId: ofitserId,
    rankId: deshlegchId,
    organizationId: org0165Id,
    departmentId: dep0125Id,
    positionId: zastaviinDargaId,
    addedAt,
    addedBy: userToumkuId,
  },
];
