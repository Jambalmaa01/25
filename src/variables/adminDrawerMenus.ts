import LogoutIcon from '@mui/icons-material/Logout';
import { MuiIconType } from '@/types';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export type AdminDrawerMenu = {
  name: string;
  icon?: MuiIconType;
  divider?: boolean;
} & (
  | {
      href: string;
    }
  | {
      children?: AdminDrawerMenu[];
    }
);

export const adminDrawerMenus: AdminDrawerMenu[] = [
  {
    name: 'Улс',
    href: '/admin/countries',
    icon: LocationOnIcon,
  },
  {
    name: 'Хот/Аймаг',
    href: '/admin/cities',
    icon: LocationOnIcon,
  },
  {
    name: 'Дүүрэг/Сум',
    href: '/admin/districts',
    icon: LocationOnIcon,
  },
  {
    name: 'Анги',
    href: '/admin/organizations',
    icon: LocationOnIcon,
  },
  {
    name: 'Салбар',
    href: '/admin/departments',
    icon: LocationOnIcon,
  },
  {
    icon: LogoutIcon,
    name: 'Програмаас гарах',
    href: '/auth/sign-out',
  },
];
