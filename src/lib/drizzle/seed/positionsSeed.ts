import { PositionTableInsert } from '../schemas';
import { addedAt, userToumkuId } from './vars';

export type PositionSeed = Omit<PositionTableInsert, 'id'> & {
  id: string;
};

export const positionsSeed: PositionSeed[] = [
  {
    id: '6a39a2e7-5591-4e01-95b5-8ace14f3fe76',
    name: 'Заставын дарга',
    codeName: 'zastaviin_darga',
    addedAt,
    addedBy: userToumkuId,
  },
];
