'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminDepartmentRemoveForm } from '@/components/forms';

export type AdminDepartmentRemoveScreenProps = {
  departmentId: string;
};

export function AdminDepartmentRemoveScreen(
  props: AdminDepartmentRemoveScreenProps
) {
  const { departmentId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/departments/[:departmentId]/remove'}
        replaces={{ departmentId }}
      />

      <Container maxWidth='xs'>
        <AdminDepartmentRemoveForm
          departmentIds={[departmentId]}
          onSuccess={() => router.push(`/admin/departments`)}
          BackComponent={<BackLink href={`/admin/departments`} />}
        />
      </Container>
    </Box>
  );
}
