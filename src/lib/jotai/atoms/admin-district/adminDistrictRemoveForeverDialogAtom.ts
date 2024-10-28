import { atom } from 'jotai';

export type AdminDistrictRemoveForeverDialogAtom = {
  districtIds: string[];
  open: boolean;
};

export const adminDistrictRemoveForeverDialogAtom =
  atom<AdminDistrictRemoveForeverDialogAtom>({
    districtIds: [],
    open: false,
  });
