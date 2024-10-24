import { atom } from 'jotai';

export type AdminCountryRemoveDialogAtom = {
  countryIds: string[];
  open: boolean;
};

export const adminCountryRemoveDialogAtom = atom<AdminCountryRemoveDialogAtom>({
  countryIds: [],
  open: false,
});
