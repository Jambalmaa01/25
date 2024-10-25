import { atom } from 'jotai';

export type AdminCountryRemoveForeverDialogAtom = {
  countryIds: string[];
  open: boolean;
};

export const adminCountryRemoveForeverDialogAtom =
  atom<AdminCountryRemoveForeverDialogAtom>({
    countryIds: [],
    open: false,
  });
