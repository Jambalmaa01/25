import { OrganizationTableInsert } from '../schemas';
import {
  addedAt,
  cityBaynUlgiiId,
  districtErdeneBulganId,
  countryMongoliaId,
  userToumkuId,
} from './vars';

export type OrganizationSeed = Omit<OrganizationTableInsert, 'id'> & {
  id: string;
};

export const organizationsSeed: OrganizationSeed[] = [
  {
    id: '36c416b4-63ba-4c01-a3e6-b67232dd54f3',
    name: 'ӨЛГИЙ',
    codeName: '1xo',
    identityNumber: '0165',
    geometry: 'POINT(89.949516111111109 48.974665)',
    countryId: countryMongoliaId,
    cityId: cityBaynUlgiiId,
    districtId: districtErdeneBulganId,
    // zone: 'Уулын',
    // establishmentedDate: '1933-01-21',
    // responsibleBorderLength: 586.396,

    addedAt,
    addedBy: userToumkuId,
  },
];
