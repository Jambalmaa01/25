import { atom } from 'jotai';

export type AdminDepartmentViewDialogAtom = {
  departmentId: string;
  open: boolean;
};

export const adminDepartmentViewDialogAtom =
  atom<AdminDepartmentViewDialogAtom>({
    departmentId: '',
    open: false,
  });
