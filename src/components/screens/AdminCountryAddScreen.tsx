'use client';

import { Box, Container } from '@mui/material';
import { PageBreadcrumb } from '../common/PageBreadcrumb';
import { BackLink } from '../buttons';
import { AdminCountryAddForm } from '../forms';
import { useRouter } from 'next/navigation';

export function AdminCountryAddScreen() {
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/countries/add'} />

      <Container maxWidth='xs'>
        <AdminCountryAddForm
          onSuccess={() => router.push(`/admin/countries`)}
          BackComponent={<BackLink href={'/admin/countries'} />}
        />
      </Container>
    </Box>
  );
}
