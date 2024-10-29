'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminOrganizationEditForm } from '@/components/forms';

export type AdminOrganizationEditScreenProps = {
  organizationId: string;
};

export function AdminOrganizationEditScreen(
  props: AdminOrganizationEditScreenProps
) {
  const { organizationId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/organizations/[:organizationId]/edit'}
        replaces={{ organizationId }}
      />

      <Container maxWidth='xs'>
        <AdminOrganizationEditForm
          organizationId={organizationId}
          onSuccess={() => router.push(`/admin/organizations`)}
          BackComponent={<BackLink href={`/admin/organizations`} />}
        />
      </Container>
    </Box>
  );
}
