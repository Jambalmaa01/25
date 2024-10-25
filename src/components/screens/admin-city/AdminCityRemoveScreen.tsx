'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminCityRemoveForm } from '@/components/forms';

export type AdminCityRemoveScreenProps = {
  cityId: string;
};

export function AdminCityRemoveScreen(props: AdminCityRemoveScreenProps) {
  const { cityId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/cities/[:cityId]/remove'}
        replaces={{ cityId }}
      />

      <Container maxWidth='xs'>
        <AdminCityRemoveForm
          cityIds={[cityId]}
          onSuccess={() => router.push(`/admin/cities`)}
          BackComponent={<BackLink href={`/admin/cities`} />}
        />
      </Container>
    </Box>
  );
}
