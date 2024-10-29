'use client';

import {
  Box,
  Container,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { PageBreadcrumb } from '@/components/common';
import { trpc } from '@/lib/trpc/trpc';
import { ActionTypography } from '@/components/typographies';
import {
  ErrorStatus,
  LoadingStatus,
  NoDataStatus,
} from '@/components/statuses';
import dayjs from 'dayjs';
import { BackLink } from '@/components/buttons';
import { SourceEditLink, SourceRemoveLink } from '@/components/sources';

export type AdminDepartmentScreenProps = {
  departmentId: string;
};

export function AdminDepartmentScreen(props: AdminDepartmentScreenProps) {
  const { departmentId } = props;
  const { data, isLoading, isFetching, isError, error } =
    trpc.adminDepartmentQuery.useQuery({ departmentId });

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/departments/[:departmentId]'}
        replaces={{ departmentId }}
      />

      <Container maxWidth='sm'>
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
          <Grid2 size={6}>
            <SourceEditLink
              href='/admin/departments/[:departmentId]/edit'
              replaces={{ departmentId }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <SourceRemoveLink
              href='/admin/departments/[:departmentId]/remove'
              replaces={{ departmentId }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={12}>
            <BackLink href='/admin/departments' />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
