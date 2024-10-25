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

export type AdminCityViewFormProps = {
  cityId: string;
  BackComponent: ReactNode;
};

export function AdminCityViewForm(props: AdminCityViewFormProps) {
  const { cityId, BackComponent } = props;
  const { data, isLoading, isFetching, isError, error } =
    trpc.adminCityQuery.useQuery({ cityId });

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12} textAlign={'center'}>
        <ActionTypography>Хот/Аймаг</ActionTypography>
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
                  <TableCell>{data.city.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Нэр</TableCell>
                  <TableCell>{data.city.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Код</TableCell>
                  <TableCell>{data.city.codeName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Бүртгэсэн хэрэгэгч</TableCell>
                  <TableCell>{data.city.addedUsername}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Бүртгэсэн огноо</TableCell>
                  <TableCell>
                    {dayjs(data.city.addedAt).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Зассан хэрэгэгч</TableCell>
                  <TableCell>
                    {data.city.editedUsername ? data.city.editedUsername : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Зассан огноо</TableCell>
                  <TableCell>
                    {data.city.editedAt
                      ? dayjs(data.city.editedAt).format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Устгасан хэрэгэгч</TableCell>
                  <TableCell>
                    {data.city.removedUsername
                      ? data.city.removedUsername
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Устгасан огноо</TableCell>
                  <TableCell>
                    {data.city.removedAt
                      ? dayjs(data.city.removedAt).format('YYYY-MM-DD HH:mm:ss')
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
          href='/admin/cities/[:cityId]/edit'
          replaces={{ cityId }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={4}>
        <SourceRemoveLink
          href='/admin/cities/[:cityId]/remove'
          replaces={{ cityId }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={4}>
        <SourceRemoveForeverLink
          href='/admin/cities/[:cityId]/remove-forever'
          replaces={{ cityId }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={12}>{BackComponent}</Grid2>
    </Grid2>
  );
}
