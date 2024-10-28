'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminDistrictRemoveForm } from '@/components/forms';

export type AdminDistrictRemoveScreenProps = {
  districtId: string;
};

export function AdminDistrictRemoveScreen(
  props: AdminDistrictRemoveScreenProps
) {
  const { districtId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/districts/[:districtId]/remove'}
        replaces={{ districtId }}
      />

      <Container maxWidth='xs'>
        <AdminDistrictRemoveForm
          districtIds={[districtId]}
          onSuccess={() => router.push(`/admin/districts`)}
          BackComponent={<BackLink href={`/admin/districts`} />}
        />
      </Container>
    </Box>
  );
}
