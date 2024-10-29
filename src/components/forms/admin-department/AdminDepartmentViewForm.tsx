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

export type AdminDepartmentViewFormProps = {
  departmentId: string;
  BackComponent: ReactNode;
};

export function AdminDepartmentViewForm(props: AdminDepartmentViewFormProps) {
  const { departmentId, BackComponent } = props;
  const { data, isLoading, isFetching, isError, error } =
    trpc.adminDepartmentQuery.useQuery({ departmentId });

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
                  <TableCell>{data.department.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Улс</TableCell>
                  <TableCell>{data.department.countryName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Хот/Аймаг</TableCell>
                  <TableCell>{data.department.cityName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Нэр</TableCell>
                  <TableCell>{data.department.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Код</TableCell>
                  <TableCell>{data.department.codeName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Бүртгэсэн хэрэгэгч</TableCell>
                  <TableCell>{data.department.addedUsername}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Бүртгэсэн огноо</TableCell>
                  <TableCell>
                    {dayjs(data.department.addedAt).format(
                      'YYYY-MM-DD HH:mm:ss'
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Зассан хэрэгэгч</TableCell>
                  <TableCell>
                    {data.department.editedUsername
                      ? data.department.editedUsername
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Зассан огноо</TableCell>
                  <TableCell>
                    {data.department.editedAt
                      ? dayjs(data.department.editedAt).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Устгасан хэрэгэгч</TableCell>
                  <TableCell>
                    {data.department.removedUsername
                      ? data.department.removedUsername
                      : '-'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Устгасан огноо</TableCell>
                  <TableCell>
                    {data.department.removedAt
                      ? dayjs(data.department.removedAt).format(
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
          href='/admin/departments/[:departmentId]/edit'
          replaces={{ departmentId }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={4}>
        <SourceRemoveLink
          href='/admin/departments/[:departmentId]/remove'
          replaces={{ departmentId }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={4}>
        <SourceRemoveForeverLink
          href='/admin/departments/[:departmentId]/remove-forever'
          replaces={{ departmentId }}
          fullWidth
        />
      </Grid2>
      <Grid2 size={12}>{BackComponent}</Grid2>
    </Grid2>
  );
}
