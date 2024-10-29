import { atom } from 'jotai';

export type AdminOrganizationRemoveDialogAtom = {
  organizationIds: string[];
  open: boolean;
};

export const adminOrganizationRemoveDialogAtom =
  atom<AdminOrganizationRemoveDialogAtom>({
    organizationIds: [],
    open: false,
  });
