import { atom } from 'jotai';

export type AdminOrganizationSelectDialogAtom = {
  open: boolean;
};

export const adminOrganizationSelectDialogAtom =
  atom<AdminOrganizationSelectDialogAtom>({
    open: false,
  });
