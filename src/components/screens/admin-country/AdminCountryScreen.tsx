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

export type AdminCountryScreenProps = {
  countryId: string;
};

export function AdminCountryScreen(props: AdminCountryScreenProps) {
  const { countryId } = props;
  const { data, isLoading, isFetching, isError, error } =
    trpc.adminCountryQuery.useQuery({ countryId });

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/countries/[:countryId]'}
        replaces={{ countryId }}
      />

      <Container maxWidth='sm'>
        <Grid2 container spacing={2}>
          <Grid2 size={12} textAlign={'center'}>
            <ActionTypography>Улс</ActionTypography>
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
                      <TableCell>{data.country.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Нэр</TableCell>
                      <TableCell>{data.country.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Код</TableCell>
                      <TableCell>{data.country.codeName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Бүртгэсэн хэрэгэгч</TableCell>
                      <TableCell>{data.country.addedUsername}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Бүртгэсэн огноо</TableCell>
                      <TableCell>
                        {dayjs(data.country.addedAt).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Зассан хэрэгэгч</TableCell>
                      <TableCell>
                        {data.country.editedUsername
                          ? data.country.editedUsername
                          : '-'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Зассан огноо</TableCell>
                      <TableCell>
                        {data.country.editedAt
                          ? dayjs(data.country.editedAt).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )
                          : '-'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Устгасан хэрэгэгч</TableCell>
                      <TableCell>
                        {data.country.removedUsername
                          ? data.country.removedUsername
                          : '-'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Устгасан огноо</TableCell>
                      <TableCell>
                        {data.country.removedAt
                          ? dayjs(data.country.removedAt).format(
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
              href='/admin/countries/[:countryId]/edit'
              replaces={{ countryId }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <SourceRemoveLink
              href='/admin/countries/[:countryId]/remove'
              replaces={{ countryId }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={12}>
            <BackLink href='/admin/countries' />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
