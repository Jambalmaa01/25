'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminCountryEditForm } from '@/components/forms';

export type AdminCountryEditScreenProps = {
  countryId: string;
};

export function AdminCountryEditScreen(props: AdminCountryEditScreenProps) {
  const { countryId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/countries/[:countryId]/edit'}
        replaces={{ countryId }}
      />

      <Container maxWidth='xs'>
        <AdminCountryEditForm
          countryId={countryId}
          onSuccess={() => router.push(`/admin/countries`)}
          BackComponent={<BackLink href={`/admin/countries`} />}
        />
      </Container>
    </Box>
  );
}
