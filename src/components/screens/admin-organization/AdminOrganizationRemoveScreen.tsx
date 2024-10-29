'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminOrganizationRemoveForm } from '@/components/forms';

export type AdminOrganizationRemoveScreenProps = {
  organizationId: string;
};

export function AdminOrganizationRemoveScreen(
  props: AdminOrganizationRemoveScreenProps
) {
  const { organizationId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/organizations/[:organizationId]/remove'}
        replaces={{ organizationId }}
      />

      <Container maxWidth='xs'>
        <AdminOrganizationRemoveForm
          organizationIds={[organizationId]}
          onSuccess={() => router.push(`/admin/organizations`)}
          BackComponent={<BackLink href={`/admin/organizations`} />}
        />
      </Container>
    </Box>
  );
}
