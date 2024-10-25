import { atom } from 'jotai';

export type AdminCountrySelectDialogAtom = {
  open: boolean;
};

export const adminCountrySelectDialogAtom = atom<AdminCountrySelectDialogAtom>({
  open: false,
});
