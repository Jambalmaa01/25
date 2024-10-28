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

export type AdminDistrictScreenProps = {
  districtId: string;
};

export function AdminDistrictScreen(props: AdminDistrictScreenProps) {
  const { districtId } = props;
  const { data, isLoading, isFetching, isError, error } =
    trpc.adminDistrictQuery.useQuery({ districtId });

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/districts/[:districtId]'}
        replaces={{ districtId }}
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
                      <TableCell>{data.district.id}</TableCell>
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
                        {dayjs(data.district.addedAt).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )}
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
          <Grid2 size={6}>
            <SourceEditLink
              href='/admin/districts/[:districtId]/edit'
              replaces={{ districtId }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <SourceRemoveLink
              href='/admin/districts/[:districtId]/remove'
              replaces={{ districtId }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={12}>
            <BackLink href='/admin/districts' />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
