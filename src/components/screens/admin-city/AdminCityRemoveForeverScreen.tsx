'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminCityRemoveForeverForm } from '@/components/forms';

export type AdminCityRemoveForeverScreenProps = {
  cityId: string;
};

export function AdminCityRemoveForeverScreen(
  props: AdminCityRemoveForeverScreenProps
) {
  const { cityId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/cities/[:cityId]/remove-forever'}
        replaces={{ cityId }}
      />

      <Container maxWidth='xs'>
        <AdminCityRemoveForeverForm
          cityIds={[cityId]}
          onSuccess={() => router.push(`/admin/cities`)}
          BackComponent={<BackLink href={`/admin/cities`} />}
        />
      </Container>
    </Box>
  );
}
