import { atom } from 'jotai';

export type AdminCityEditDialogAtom = {
  cityId: string;
  open: boolean;
};

export const adminCityEditDialogAtom = atom<AdminCityEditDialogAtom>({
  cityId: '',
  open: false,
});
