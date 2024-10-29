'use client';

import { Box, Container } from '@mui/material';
import { PageBreadcrumb } from '@/components/common';
import { BackLink } from '@/components/buttons';
import { AdminDepartmentAddForm } from '@/components/forms';
import { useRouter } from 'next/navigation';

export function AdminDepartmentAddScreen() {
  const router = useRouter();

  return (
    <Box p={2}>
      <PageBreadcrumb url={'/admin/departments/add'} />

      <Container maxWidth='xs'>
        <AdminDepartmentAddForm
          onSuccess={() => router.push(`/admin/departments`)}
          BackComponent={<BackLink href={'/admin/departments'} />}
        />
      </Container>
    </Box>
  );
}
