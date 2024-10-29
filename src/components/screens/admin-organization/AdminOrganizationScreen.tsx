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

export type AdminOrganizationScreenProps = {
  organizationId: string;
};

export function AdminOrganizationScreen(props: AdminOrganizationScreenProps) {
  const { organizationId } = props;
  const { data, isLoading, isFetching, isError, error } =
    trpc.adminOrganizationQuery.useQuery({ organizationId });

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/organizations/[:organizationId]'}
        replaces={{ organizationId }}
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
                      <TableCell>{data.organization.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Нэр</TableCell>
                      <TableCell>{data.organization.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Код</TableCell>
                      <TableCell>{data.organization.codeName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Бүртгэсэн хэрэгэгч</TableCell>
                      <TableCell>{data.organization.addedUsername}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Бүртгэсэн огноо</TableCell>
                      <TableCell>
                        {dayjs(data.organization.addedAt).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Зассан хэрэгэгч</TableCell>
                      <TableCell>
                        {data.organization.editedUsername
                          ? data.organization.editedUsername
                          : '-'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Зассан огноо</TableCell>
                      <TableCell>
                        {data.organization.editedAt
                          ? dayjs(data.organization.editedAt).format(
                              'YYYY-MM-DD HH:mm:ss'
                            )
                          : '-'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Устгасан хэрэгэгч</TableCell>
                      <TableCell>
                        {data.organization.removedUsername
                          ? data.organization.removedUsername
                          : '-'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Устгасан огноо</TableCell>
                      <TableCell>
                        {data.organization.removedAt
                          ? dayjs(data.organization.removedAt).format(
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
              href='/admin/organizations/[:organizationId]/edit'
              replaces={{ organizationId }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={6}>
            <SourceRemoveLink
              href='/admin/organizations/[:organizationId]/remove'
              replaces={{ organizationId }}
              fullWidth
            />
          </Grid2>
          <Grid2 size={12}>
            <BackLink href='/admin/organizations' />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
