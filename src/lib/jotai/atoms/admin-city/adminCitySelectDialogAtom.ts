import { atom } from 'jotai';

export type AdminCitySelectDialogAtom = {
  open: boolean;
};

export const adminCitySelectDialogAtom = atom<AdminCitySelectDialogAtom>({
  open: false,
});
