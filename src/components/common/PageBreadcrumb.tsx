import { replacePath } from '@/utils';
import { Path } from '@/variables';
import { Box, Breadcrumbs, Button } from '@mui/material';
import Link from 'next/link';

export type PageBreadcrumbProps = {
  url: Path;
  replaces?: {
    [key: string]: string;
  };
};

export type PageBreadcrumbMatch = {
  [key in Path]: string;
};

const pageBreadcrumbMatch: PageBreadcrumbMatch = {
  '/': 'Нүүр хуудас',
  '/admin': 'Админ хуудас',

  '/admin/countries': 'Улсууд',
  '/admin/countries/add': 'Улс бүртгэх',
  '/admin/countries/[:countryId]': 'Улс',
  '/admin/countries/[:countryId]/edit': 'Улс засах',
  '/admin/countries/[:countryId]/remove': 'Улс устгах',
  '/admin/countries/[:countryId]/remove-forever': 'Улс баазаас утгах',

  '/admin/cities': 'Хот/Аймгууд',
  '/admin/cities/add': 'Хот/Аймаг бүртгэх',
  '/admin/cities/[:cityId]': 'Хот/Аймаг',
  '/admin/cities/[:cityId]/edit': 'Хот/Аймаг засах',
  '/admin/cities/[:cityId]/remove': 'Хот/Аймаг устгах',
  '/admin/cities/[:cityId]/remove-forever': 'Хот/Аймаг баазаас утгах',

  '/admin/districts': 'Дүүрэг/Сумууд',
  '/admin/districts/add': 'Дүүрэг/Сум бүртгэх',
  '/admin/districts/[:districtId]': 'Дүүрэг/Сум',
  '/admin/districts/[:districtId]/edit': 'Дүүрэг/Сум засах',
  '/admin/districts/[:districtId]/remove': 'Дүүрэг/Сум устгах',
  '/admin/districts/[:districtId]/remove-forever': 'Дүүрэг/Сум баазаас утгах',

  '/admin/organizations': 'Ангиуд',
  '/admin/organizations/add': 'Анги бүртгэх',
  '/admin/organizations/[:organizationId]': 'Анги',
  '/admin/organizations/[:organizationId]/edit': 'Анги засах',
  '/admin/organizations/[:organizationId]/remove': 'Анги устгах',
  '/admin/organizations/[:organizationId]/remove-forever': 'Анги баазаас утгах',

  '/admin/departments': 'Салбарууд',
  '/admin/departments/add': 'Салбар бүртгэх',
  '/admin/departments/[:departmentId]': 'Салбар',
  '/admin/departments/[:departmentId]/edit': 'Салбар засах',
  '/admin/departments/[:departmentId]/remove': 'Салбар устгах',
  '/admin/departments/[:departmentId]/remove-forever': 'Салбар баазаас утгах',
};

function getPaths(url: Path): Path[] {
  const segments = url.split('/');

  const paths: Path[] = ['/'];
  let currentPath = '';

  for (const segment of segments) {
    if (!segment) continue;

    currentPath += `/${segment}`;

    // @fix
    paths.push(currentPath as Path);
  }

  return paths;
}

export function PageBreadcrumb(props: PageBreadcrumbProps) {
  const { url, replaces } = props;

  return (
    <Box sx={{ mb: 1 }}>
      <Breadcrumbs>
        {getPaths(url).map((l, index) => (
          <Button
            key={index}
            LinkComponent={Link}
            href={replacePath(l, replaces)}
            sx={{ textTransform: 'none' }}
            variant='text'
            size='small'
          >
            {pageBreadcrumbMatch[l]}
          </Button>
        ))}
      </Breadcrumbs>
    </Box>
  );
}
