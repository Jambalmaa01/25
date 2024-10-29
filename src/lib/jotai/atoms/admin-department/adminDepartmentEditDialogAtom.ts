import { atom } from 'jotai';

export type AdminDepartmentEditDialogAtom = {
  departmentId: string;
  open: boolean;
};

export const adminDepartmentEditDialogAtom =
  atom<AdminDepartmentEditDialogAtom>({
    departmentId: '',
    open: false,
  });
