import { atom } from 'jotai';

export type AdminOrganizationEditDialogAtom = {
  organizationId: string;
  open: boolean;
};

export const adminOrganizationEditDialogAtom =
  atom<AdminOrganizationEditDialogAtom>({
    organizationId: '',
    open: false,
  });
