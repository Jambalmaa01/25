'use client';

import { adminDrawerWidth } from '@/variables';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { adminDrawerOpenAtom } from '@/lib/jotai';
import { useAtom } from 'jotai';

export function AdminAppBar() {
  const [open, setOpen] = useAtom(adminDrawerOpenAtom);

  function onToggleCategoryDrawer() {
    setOpen(!open);
  }
  return (
    <AppBar
      position='fixed'
      sx={{
        width: {
          lg: `calc(100% - ${adminDrawerWidth}px)`,
        },
        ml: { lg: `${adminDrawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          edge='start'
          onClick={onToggleCategoryDrawer}
          sx={{ mr: 2, display: { lg: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography>Админий хуудас</Typography>
      </Toolbar>
    </AppBar>
  );
}
