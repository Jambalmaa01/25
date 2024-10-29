'use client';

import { Box, Container } from '@mui/material';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminOrganizationAddForm } from '@/components/forms';
import { useRouter } from 'next/navigation';

export function AdminOrganizationAddScreen() {
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/organizations/add'} />

      <Container maxWidth='xs'>
        <AdminOrganizationAddForm
          onSuccess={() => router.push(`/admin/organizations`)}
          BackComponent={<BackLink href={'/admin/organizations'} />}
        />
      </Container>
    </Box>
  );
}
