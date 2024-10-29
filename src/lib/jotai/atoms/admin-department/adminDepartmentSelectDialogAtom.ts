import { atom } from 'jotai';

export type AdminDepartmentSelectDialogAtom = {
  open: boolean;
};

export const adminDepartmentSelectDialogAtom =
  atom<AdminDepartmentSelectDialogAtom>({
    open: false,
  });
