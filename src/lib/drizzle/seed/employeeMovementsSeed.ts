import dayjs from 'dayjs';
import { EmployeeMovementTableInsert } from '../schemas';
import {
  addedAt,
  dep0125Id,
  deshlegchId,
  ofitserId,
  org0165Id,
  toumkuEmployeeId,
  userToumkuId,
  zastaviinDargaId,
} from './vars';

export type EmployeeMovementTableSeed = Omit<
  EmployeeMovementTableInsert,
  'id'
> & {
  id: string;
};

export const employeeMovementsSeed: EmployeeMovementTableSeed[] = [
  {
    id: 'ee28b989-75dc-42ad-8477-4df3266b6fa9',
    addedAt,
    addedBy: userToumkuId,
    organizationCameDate: dayjs(addedAt).format('YYYY-MM-DD'),
    departmentCameDate: dayjs(addedAt).format('YYYY-MM-DD'),
    employeeId: toumkuEmployeeId,
    identityNumber: '01',
    rankGroupId: ofitserId,
    rankId: deshlegchId,
    organizationId: org0165Id,
    departmentId: dep0125Id,
    positionId: zastaviinDargaId,
  },
];
