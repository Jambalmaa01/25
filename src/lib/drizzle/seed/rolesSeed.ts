import { RoleTableInsert } from '../schemas';
import { addedAt } from './vars';

export type RoleSeed = Omit<RoleTableInsert, 'id'> & { id: string };

export const rolesSeed: RoleSeed[] = [
  {
    id: '86bdb42c-48d6-4cb1-9c75-febbc813a811',
    name: 'Админ',
    codeName: 'admin',
    addedAt,
  },
  {
    id: 'bfe3e93a-03fc-4851-9f5f-ad2b62190314',
    name: 'Ерөнхий газар',
    codeName: 'erunhii-gazar',
    addedAt,
  },
  {
    id: '3f7b3448-f826-4cad-b5cf-cecc877b01df',
    name: 'Анги',
    codeName: 'angi',
    addedAt,
  },
  {
    id: '03b3d3d4-f04b-4e7d-b0dd-21f2d77d20d1',
    name: 'Застав',
    codeName: 'zastav',
    addedAt,
  },
];
