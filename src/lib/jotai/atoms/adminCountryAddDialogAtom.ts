import { atom } from 'jotai';

export type AdminCountryAddDialogAtom = {
  open: boolean;
};

export const adminCountryAddDialogAtom = atom<AdminCountryAddDialogAtom>({
  open: false,
});
