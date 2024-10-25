import { atom } from 'jotai';

export type AdminCountryEditDialogAtom = {
  countryId: string;
  open: boolean;
};

export const adminCountryEditDialogAtom = atom<AdminCountryEditDialogAtom>({
  countryId: '',
  open: false,
});
