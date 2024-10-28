'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminDistrictRemoveForeverForm } from '@/components/forms';

export type AdminDistrictRemoveForeverScreenProps = {
  districtId: string;
};

export function AdminDistrictRemoveForeverScreen(
  props: AdminDistrictRemoveForeverScreenProps
) {
  const { districtId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/districts/[:districtId]/remove-forever'}
        replaces={{ districtId }}
      />

      <Container maxWidth='xs'>
        <AdminDistrictRemoveForeverForm
          districtIds={[districtId]}
          onSuccess={() => router.push(`/admin/districts`)}
          BackComponent={<BackLink href={`/admin/districts`} />}
        />
      </Container>
    </Box>
  );
}
