import { atom } from 'jotai';

export type AdminCityViewDialogAtom = {
  cityId: string;
  open: boolean;
};

export const adminCityViewDialogAtom = atom<AdminCityViewDialogAtom>({
  cityId: '',
  open: false,
});
