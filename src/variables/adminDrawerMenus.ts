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
    icon: LocationOnIcon,
    name: 'Байршил',
    children: [
      {
        name: 'Улс',
        href: '/admin/countries',
      },
      {
        name: 'Хот/Аймаг',
        href: '/admin/cities',
      },
      {
        name: 'Дүүрэг/Сум',
        href: '/admin/districts',
      },
    ],
    divider: true,
  },
  {
    icon: LogoutIcon,
    name: 'Програмаас гарах',
    href: '/auth/sign-out',
  },
];
