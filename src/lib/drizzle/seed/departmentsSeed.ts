import { DepartmentTableInsert } from '../schemas';
import {
  countryMongoliaId,
  org0165Id,
  addedAt,
  userToumkuId,
  cityUlaanbaatarId,
  districtBaynzurhId,
} from './vars';

export type DepartmentSeed = Omit<DepartmentTableInsert, 'id'> & {
  id: string;
};

export const departmentsSeed: DepartmentSeed[] = [
  {
    id: '4fefa92d-6c16-4fa6-bfa0-e58e9935a118',
    name: '0125',
    codeName: '1xo-1xз',
    geometry: 'POINT(88.155313889 48.732969444)',
    countryId: countryMongoliaId,
    cityId: cityUlaanbaatarId,
    districtId: districtBaynzurhId,
    organizationId: org0165Id,
    addedAt,
    addedBy: userToumkuId,
  },
];
