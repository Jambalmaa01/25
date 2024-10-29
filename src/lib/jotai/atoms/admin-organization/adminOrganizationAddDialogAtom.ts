import { atom } from 'jotai';

export type AdminOrganizationAddDialogAtom = {
  open: boolean;
};

export const adminOrganizationAddDialogAtom =
  atom<AdminOrganizationAddDialogAtom>({
    open: false,
  });
