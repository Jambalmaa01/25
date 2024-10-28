'use client';

import {
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { trpc } from '@/lib/trpc/trpc';
import { ReactNode } from 'react';
import { ActionTypography } from '@/components/typographies';
import {
  ErrorStatus,
  LoadingStatus,
  NoDataStatus,
} from '@/components/statuses';
import {
  SourceEditLink,
  SourceRemoveForeverLink,
  SourceRemoveLink,
} from '@/components/sources';
import dayjs from 'dayjs';

export type AdminDistrictViewFormProps = {
  districtId: string;
  BackComponent: ReactNode;
};

export function AdminDistrictViewForm(props: AdminDistrictViewFormProps) {
  const { districtId, BackComponent } = props;
  const { data, isLoading, isFetching, isError, error } =
    trpc.adminDistrictQuery.useQuery({ districtId });

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12} textAlign={'center'}>
        <ActionTypography>Дүүрэг/Сум</ActionTypography>
      </Grid2>

      {isLoading || isFetching ? (
        <Grid2 size={12} textAlign={'center'}>
          <LoadingStatus />
        </Grid2>
      ) : isError ? (
        <Grid2 size={12} textAlign={'center'}>
          <ErrorStatus error={error} />
        </Grid2>
      ) : !data ? (
        <Grid2 size={12} textAlign={'center'}>
          <NoDataStatus />
        </Grid2>
      ) : (
        <Grid2 size={12}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Дугаар</TableCell>
                  <TableCell>{data.district.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Улс</TableCell>
                  <TableCell>{data.district.countryName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Хот/Аймаг</TableCell>
                  <TableCell>{data.district.cityName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Нэр</TableCell>
                  <TableCell>{data.district.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Код</TableCell>
                  <TableCell>{data.district.codeName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Бүртгэсэн хэрэгэгч</TableCell>
                  <TableCell>{data.district.addedUsername}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Бүртгэсэн огноо</TableCell>
                  <TableCell>
                    {dayjs(data.district.addedAt).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Зассан хэрэгэгч</TableCell>
                  <TableCell>
                    {data.district.editedUsername
                      ? data.district.editedUsername
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Зассан огноо</TableCell>
                  <TableCell>
                    {data.district.editedAt
                      ? dayjs(data.district.editedAt).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Устгасан хэрэгэгч</TableCell>
                  <TableCell>
                    {data.district.removedUsername
                      ? data.district.removedUsername
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Устгасан огноо</TableCell>
                  <TableCell>
                    {data.district.removedAt
                      ? dayjs(data.district.removedAt).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )
                      : '-'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
      )}
      <Grid2 size={4}>
        <SourceEditLink
          href='/admin/districts/[:districtId]/edit'
          replaces={{ districtId }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={4}>
        <SourceRemoveLink
          href='/admin/districts/[:districtId]/remove'
          replaces={{ districtId }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={4}>
        <SourceRemoveForeverLink
          href='/admin/districts/[:districtId]/remove-forever'
          replaces={{ districtId }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={12}>{BackComponent}</Grid2>
    </Grid2>
  );
}
