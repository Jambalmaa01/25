import { atom } from 'jotai';

export type AdminDistrictViewDialogAtom = {
  districtId: string;
  open: boolean;
};

export const adminDistrictViewDialogAtom = atom<AdminDistrictViewDialogAtom>({
  districtId: '',
  open: false,
});
