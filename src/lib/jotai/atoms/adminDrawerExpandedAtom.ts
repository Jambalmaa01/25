import { atomWithStorage } from 'jotai/utils';

export const adminDrawerExpandedAtom = atomWithStorage<{
  [key: string]: boolean;
}>('adminDrawerExpandedAtom', {});
