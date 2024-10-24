import { OrganizationTableInsert } from '../schemas';
import {
  addedAt,
  baynUlgiiId,
  erdeneBulganId,
  mongoliaId,
  toumkuId,
} from './vars';

export type OrganizationSeed = Omit<OrganizationTableInsert, 'id'> & {
  id: string;
};

export const organizationsSeed: OrganizationSeed[] = [
  {
    id: '36c416b4-63ba-4c01-a3e6-b67232dd54f3',
    name: '0165',
    codeName: '1xo',
    geometry: 'GEOMETRYCOLLECTION(POINT(89.949516111 48.974665))',
    countryId: mongoliaId,
    cityId: baynUlgiiId,
    districtId: erdeneBulganId,
    addedAt,
    addedBy: toumkuId,
  },
];
