import { atom } from 'jotai';

export type AdminDistrictRemoveDialogAtom = {
  districtIds: string[];
  open: boolean;
};

export const adminDistrictRemoveDialogAtom =
  atom<AdminDistrictRemoveDialogAtom>({
    districtIds: [],
    open: false,
  });
