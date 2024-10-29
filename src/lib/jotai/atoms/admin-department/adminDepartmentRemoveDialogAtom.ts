import { atom } from 'jotai';

export type AdminDepartmentRemoveDialogAtom = {
  departmentIds: string[];
  open: boolean;
};

export const adminDepartmentRemoveDialogAtom =
  atom<AdminDepartmentRemoveDialogAtom>({
    departmentIds: [],
    open: false,
  });
