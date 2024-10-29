import { atom } from 'jotai';

export type AdminOrganizationViewDialogAtom = {
  organizationId: string;
  open: boolean;
};

export const adminOrganizationViewDialogAtom =
  atom<AdminOrganizationViewDialogAtom>({
    organizationId: '',
    open: false,
  });
