'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminCountryRemoveForm } from '@/components/forms';

export type AdminCountryRemoveScreenProps = {
  countryId: string;
};

export function AdminCountryRemoveScreen(props: AdminCountryRemoveScreenProps) {
  const { countryId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/countries/[:countryId]/remove'}
        replaces={{ countryId }}
      />

      <Container maxWidth='xs'>
        <AdminCountryRemoveForm
          countryIds={[countryId]}
          onSuccess={() => router.push(`/admin/countries`)}
          BackComponent={<BackLink href={`/admin/countries`} />}
        />
      </Container>
    </Box>
  );
}
