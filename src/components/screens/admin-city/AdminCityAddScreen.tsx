'use client';

import { Box, Container } from '@mui/material';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminCityAddForm } from '@/components/forms';
import { useRouter } from 'next/navigation';

export function AdminCityAddScreen() {
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/cities/add'} />

      <Container maxWidth='xs'>
        <AdminCityAddForm
          onSuccess={() => router.push(`/admin/cities`)}
          BackComponent={<BackLink href={'/admin/cities'} />}
        />
      </Container>
    </Box>
  );
}
