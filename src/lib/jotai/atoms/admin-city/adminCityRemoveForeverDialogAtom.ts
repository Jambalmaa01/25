import { atom } from 'jotai';

export type AdminCityRemoveForeverDialogAtom = {
  cityIds: string[];
  open: boolean;
};

export const adminCityRemoveForeverDialogAtom =
  atom<AdminCityRemoveForeverDialogAtom>({
    cityIds: [],
    open: false,
  });
