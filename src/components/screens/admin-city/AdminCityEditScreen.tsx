'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminCityEditForm } from '@/components/forms';

export type AdminCityEditScreenProps = {
  cityId: string;
};

export function AdminCityEditScreen(props: AdminCityEditScreenProps) {
  const { cityId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/cities/[:cityId]/edit'}
        replaces={{ cityId }}
      />

      <Container maxWidth='xs'>
        <AdminCityEditForm
          cityId={cityId}
          onSuccess={() => router.push(`/admin/cities`)}
          BackComponent={<BackLink href={`/admin/cities`} />}
        />
      </Container>
    </Box>
  );
}
