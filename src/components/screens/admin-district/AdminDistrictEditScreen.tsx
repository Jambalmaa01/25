'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminDistrictEditForm } from '@/components/forms';

export type AdminDistrictEditScreenProps = {
  districtId: string;
};

export function AdminDistrictEditScreen(props: AdminDistrictEditScreenProps) {
  const { districtId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/districts/[:districtId]/edit'}
        replaces={{ districtId }}
      />

      <Container maxWidth='xs'>
        <AdminDistrictEditForm
          districtId={districtId}
          onSuccess={() => router.push(`/admin/districts`)}
          BackComponent={<BackLink href={`/admin/districts`} />}
        />
      </Container>
    </Box>
  );
}
