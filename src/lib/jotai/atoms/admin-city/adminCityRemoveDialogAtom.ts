import { atom } from 'jotai';

export type AdminCityRemoveDialogAtom = {
  cityIds: string[];
  open: boolean;
};

export const adminCityRemoveDialogAtom = atom<AdminCityRemoveDialogAtom>({
  cityIds: [],
  open: false,
});
