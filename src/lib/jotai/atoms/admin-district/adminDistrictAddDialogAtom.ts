import { atom } from 'jotai';

export type AdminDistrictAddDialogAtom = {
  open: boolean;
};

export const adminDistrictAddDialogAtom = atom<AdminDistrictAddDialogAtom>({
  open: false,
});
