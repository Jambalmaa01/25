import { atom } from 'jotai';

export type AdminDistrictSelectDialogAtom = {
  open: boolean;
};

export const adminDistrictSelectDialogAtom =
  atom<AdminDistrictSelectDialogAtom>({
    open: false,
  });
