import { atom } from 'jotai';

export type AdminCityAddDialogAtom = {
  open: boolean;
};

export const adminCityAddDialogAtom = atom<AdminCityAddDialogAtom>({
  open: false,
});
