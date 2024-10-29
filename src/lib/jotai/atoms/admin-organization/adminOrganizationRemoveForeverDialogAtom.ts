import { atom } from 'jotai';

export type AdminOrganizationRemoveForeverDialogAtom = {
  organizationIds: string[];
  open: boolean;
};

export const adminOrganizationRemoveForeverDialogAtom =
  atom<AdminOrganizationRemoveForeverDialogAtom>({
    organizationIds: [],
    open: false,
  });
