import { atom } from 'jotai';

export type AdminDepartmentAddDialogAtom = {
  open: boolean;
};

export const adminDepartmentAddDialogAtom = atom<AdminDepartmentAddDialogAtom>({
  open: false,
});
