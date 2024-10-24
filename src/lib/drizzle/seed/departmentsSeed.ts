import { DepartmentTableInsert } from '../schemas';
import {
  mongoliaId,
  baynUlgiiId,
  ulgiiId,
  org0165Id,
  addedAt,
  toumkuId,
} from './vars';

export type DepartmentSeed = Omit<DepartmentTableInsert, 'id'> & {
  id: string;
};

export const departmentsSeed: DepartmentSeed[] = [
  {
    id: '4fefa92d-6c16-4fa6-bfa0-e58e9935a118',
    name: '0125',
    codeName: '1xo-1xз',
    geometry: 'GEOMETRYCOLLECTION(POINT(88.155313889 48.732969444))',
    countryId: mongoliaId,
    cityId: baynUlgiiId,
    districtId: ulgiiId,
    organizationId: org0165Id,
    addedAt,
    addedBy: toumkuId,
  },
];
