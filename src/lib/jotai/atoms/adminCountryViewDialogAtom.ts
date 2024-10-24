import { atom } from 'jotai';

export type AdminCountryViewDialogAtom = {
  countryId: string;
  open: boolean;
};

export const adminCountryViewDialogAtom = atom<AdminCountryViewDialogAtom>({
  countryId: '',
  open: false,
});
