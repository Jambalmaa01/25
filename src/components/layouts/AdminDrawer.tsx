'use client';

import { adminDrawerOpenAtom } from '@/lib/jotai';
import { adminDrawerMenus, adminDrawerWidth } from '@/variables';
import { Box, Divider, Drawer, Toolbar } from '@mui/material';
import { useAtom } from 'jotai';
import { AdminDrawerMenuList } from './AdminDrawerMenuList';
import { Logo } from '../common';

export function AdminDrawer() {
  const [adminDrawerOpen, setAdminDrawerOpen] = useAtom(adminDrawerOpenAtom);

  function onClose() {
    setAdminDrawerOpen(false);
  }

  return (
    <Box
      component='nav'
      sx={{ width: { lg: adminDrawerWidth }, flexShrink: { sm: 0 } }}
      aria-label='mailbox folders'
    >
      <Drawer
        variant={adminDrawerOpen ? 'temporary' : 'permanent'}
        open={adminDrawerOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: adminDrawerOpen ? true : false,
        }}
        sx={{
          display: {
            xs: adminDrawerOpen ? 'block' : 'none',
            sm: adminDrawerOpen ? 'block' : 'none',
            md: adminDrawerOpen ? 'block' : 'none',
            lg: adminDrawerOpen ? 'none' : 'block',
          },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: adminDrawerWidth,
          },
        }}
      >
        <Toolbar disableGutters>
          <Logo />
        </Toolbar>
        <Divider />

        <AdminDrawerMenuList items={adminDrawerMenus} />
      </Drawer>
    </Box>
  );
}
