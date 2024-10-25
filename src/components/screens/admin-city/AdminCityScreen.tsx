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

export type AdminCityScreenProps = {
  cityId: string;
};

export function AdminCityScreen(props: AdminCityScreenProps) {
  const { cityId } = props;
  const { data, isLoading, isFetching, isError, error } =
    trpc.adminCityQuery.useQuery({ cityId });

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/cities/[:cityId]'} replaces={{ cityId }} />

      <Container maxWidth='sm'>
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
                        {data.city.editedUsername
                          ? data.city.editedUsername
                          : '-'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Зассан огноо</TableCell>
                      <TableCell>
                        {data.city.editedAt
                          ? dayjs(data.city.editedAt).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )
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
                          ? dayjs(data.city.removedAt).format(
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
              href='/admin/cities/[:cityId]/edit'
              replaces={{ cityId }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <SourceRemoveLink
              href='/admin/cities/[:cityId]/remove'
              replaces={{ cityId }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={12}>
            <BackLink href='/admin/cities' />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
