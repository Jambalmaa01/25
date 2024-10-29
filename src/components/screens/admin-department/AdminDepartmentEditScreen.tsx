'use client';

import { Box, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminDepartmentEditForm } from '@/components/forms';

export type AdminDepartmentEditScreenProps = {
  departmentId: string;
};

export function AdminDepartmentEditScreen(
  props: AdminDepartmentEditScreenProps
) {
  const { departmentId } = props;
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb
        url={'/admin/departments/[:departmentId]/edit'}
        replaces={{ departmentId }}
      />

      <Container maxWidth='xs'>
        <AdminDepartmentEditForm
          departmentId={departmentId}
          onSuccess={() => router.push(`/admin/departments`)}
          BackComponent={<BackLink href={`/admin/departments`} />}
        />
      </Container>
    </Box>
  );
}
