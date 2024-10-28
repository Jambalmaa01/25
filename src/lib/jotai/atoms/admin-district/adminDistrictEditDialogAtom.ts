import { atom } from 'jotai';

export type AdminDistrictEditDialogAtom = {
  districtId: string;
  open: boolean;
};

export const adminDistrictEditDialogAtom = atom<AdminDistrictEditDialogAtom>({
  districtId: '',
  open: false,
});
