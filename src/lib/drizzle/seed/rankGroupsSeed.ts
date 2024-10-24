import { RankGroupTableInsert } from '../schemas';
import { addedAt, toumkuId } from './vars';

export type RankGroupTableSeed = Omit<RankGroupTableInsert, 'id'> & {
  id: string;
};

export const rankGroupsSeed: RankGroupTableSeed[] = [
  {
    id: '39c8fb23-6c5c-47e4-981a-ce029c8f87ff',
    name: 'Офицер',
    codeName: 'ofitser',
    addedAt,
    addedBy: toumkuId,
  },
  {
    id: '099501c1-ac83-4631-a8c7-abbbbbb7474e',
    name: 'Ахлагч',
    codeName: 'ahlagch',
    addedAt,
    addedBy: toumkuId,
  },
  {
    id: 'b4e27f98-8fc9-414e-baf9-7b541db2b79c',
    name: 'Гэрээт ахлагч',
    codeName: 'gereet-ahlagch',
    addedAt,
    addedBy: toumkuId,
  },
  {
    id: 'ce0a8499-d8d1-4506-9a9d-3c64fb02de58',
    name: 'Гэрээт',
    codeName: 'gereet',
    addedAt,
    addedBy: toumkuId,
  },
  {
    id: '42191e7c-f5e2-4309-b897-0e3a2f88410f',
    name: 'Хугацаат',
    codeName: 'hugatsaat',
    addedAt,
    addedBy: toumkuId,
  },
  {
    id: 'fba80f79-ede0-4b29-831b-e65b6cd9ba4a',
    name: 'Энгийн',
    codeName: 'engiin',
    addedAt,
    addedBy: toumkuId,
  },
];
