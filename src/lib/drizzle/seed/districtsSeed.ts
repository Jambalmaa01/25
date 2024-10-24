import { DistrictTableInsert } from '../schemas';
import {
  mongoliaId,
  arkhangaiId,
  addedAt,
  toumkuId,
  baynUlgiiId,
} from './vars';

export type DistrictTableSeed = Omit<DistrictTableInsert, 'id'> & {
  id: string;
};

export const districtsSeed: DistrictTableSeed[] = [
  {
    id: '48e31323-4b63-4d24-a372-32ec68e5e705',
    countryId: mongoliaId,
    cityId: arkhangaiId,
    name: 'Эрдэнэбулган',
    codeName: 'erdenebulgan',
    addedAt,
    addedBy: toumkuId,
  },
  {
    id: '17ae7124-09df-4da3-b4a8-64850f85fee9',
    countryId: mongoliaId,
    cityId: arkhangaiId,
    name: 'Батцэнгэл',
    codeName: 'battsengel',
    addedAt,
    addedBy: toumkuId,
  },
  {
    id: '8ae85e14-e11d-420d-aa54-c6fd223b2f71',
    countryId: mongoliaId,
    cityId: arkhangaiId,
    name: 'Булган',
    codeName: 'bulgan',
    addedAt,
    addedBy: toumkuId,
  },
  {
    id: '15c139b8-629e-4f01-bf62-134ca42986b1',
    countryId: mongoliaId,
    cityId: arkhangaiId,
    name: 'Жаргалант',
    codeName: 'jargalant',
    addedAt,
    addedBy: toumkuId,
  },
  {
    id: 'b55bd2dd-09a3-4a28-9621-9c89bb2ba340',
    countryId: mongoliaId,
    cityId: arkhangaiId,
    name: 'Ихтамир',
    codeName: 'ih_tamir',
    addedAt,
    addedBy: toumkuId,
  },

  {
    id: '4e2555ef-cf10-4706-8dba-2c8d4203e5d6',
    countryId: mongoliaId,
    cityId: baynUlgiiId,
    name: 'Өлгий',
    codeName: 'ulgii',
    addedAt,
    addedBy: toumkuId,
  },
  {
    id: '31e39eda-43cb-480e-9a92-c3f278cbb0a9',
    countryId: mongoliaId,
    cityId: baynUlgiiId,
    name: 'Цэнгэл',
    codeName: 'tsengel',
    addedAt,
    addedBy: toumkuId,
  },
];
