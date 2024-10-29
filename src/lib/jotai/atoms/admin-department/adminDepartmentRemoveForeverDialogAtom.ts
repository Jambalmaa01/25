import { atom } from 'jotai';

export type AdminDepartmentRemoveForeverDialogAtom = {
  departmentIds: string[];
  open: boolean;
};

export const adminDepartmentRemoveForeverDialogAtom =
  atom<AdminDepartmentRemoveForeverDialogAtom>({
    departmentIds: [],
    open: false,
  });
