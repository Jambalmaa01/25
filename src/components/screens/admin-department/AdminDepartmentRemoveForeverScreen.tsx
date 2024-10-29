'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminDepartmentRemoveForeverForm } from '@/components/forms';

export type AdminDepartmentRemoveForeverScreenProps = {
  departmentId: string;
};

export function AdminDepartmentRemoveForeverScreen(
  props: AdminDepartmentRemoveForeverScreenProps
) {
  const { departmentId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/departments/[:departmentId]/remove-forever'}
        replaces={{ departmentId }}
      />

      <Container maxWidth='xs'>
        <AdminDepartmentRemoveForeverForm
          departmentIds={[departmentId]}
          onSuccess={() => router.push(`/admin/departments`)}
          BackComponent={<BackLink href={`/admin/departments`} />}
        />
      </Container>
    </Box>
  );
}
