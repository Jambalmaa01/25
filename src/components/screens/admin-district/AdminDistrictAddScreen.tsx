'use client';

import { Box, Container } from '@mui/material';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminDistrictAddForm } from '@/components/forms';
import { useRouter } from 'next/navigation';

export function AdminDistrictAddScreen() {
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/districts/add'} />

      <Container maxWidth='xs'>
        <AdminDistrictAddForm
          onSuccess={() => router.push(`/admin/districts`)}
          BackComponent={<BackLink href={'/admin/districts'} />}
        />
      </Container>
    </Box>
  );
}
