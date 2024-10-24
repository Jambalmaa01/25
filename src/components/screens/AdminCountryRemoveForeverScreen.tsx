'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '../common/PageBreadcrumb';
import { BackLink } from '../buttons';
import { AdminCountryRemoveForeverForm } from '../forms';

export type AdminCountryRemoveForeverScreenProps = {
  countryId: string;
};

export function AdminCountryRemoveForeverScreen(
  props: AdminCountryRemoveForeverScreenProps
) {
  const { countryId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/countries/[:countryId]/remove-forever'}
        replaces={{ countryId }}
      />

      <Container maxWidth='xs'>
        <AdminCountryRemoveForeverForm
          countryIds={[countryId]}
          onSuccess={() => router.push(`/admin/countries`)}
          BackComponent={<BackLink href={`/admin/countries`} />}
        />
      </Container>
    </Box>
  );
}
