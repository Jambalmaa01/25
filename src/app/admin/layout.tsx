import { AdminAppBar, AdminDrawer, AdminMain } from '@/components/layouts';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

export type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout(props: AdminLayoutProps) {
  const { children } = props;

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminAppBar />
      <AdminDrawer />
      <AdminMain>{children}</AdminMain>
    </Box>
  );
}
