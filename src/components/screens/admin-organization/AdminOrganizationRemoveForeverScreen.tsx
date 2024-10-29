'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminOrganizationRemoveForeverForm } from '@/components/forms';

export type AdminOrganizationRemoveForeverScreenProps = {
  organizationId: string;
};

export function AdminOrganizationRemoveForeverScreen(
  props: AdminOrganizationRemoveForeverScreenProps
) {
  const { organizationId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/organizations/[:organizationId]/remove-forever'}
        replaces={{ organizationId }}
      />

      <Container maxWidth='xs'>
        <AdminOrganizationRemoveForeverForm
          organizationIds={[organizationId]}
          onSuccess={() => router.push(`/admin/organizations`)}
          BackComponent={<BackLink href={`/admin/organizations`} />}
        />
      </Container>
    </Box>
  );
}
