'use client';

import { Box, Toolbar } from '@mui/material';
import { PropsWithChildren } from 'react';
import { adminDrawerWidth } from '@/variables';

export type AdminMainProps = PropsWithChildren<{}>;

export function AdminMain(props: AdminMainProps) {
  const { children } = props;

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        // p: 3,
        width: {
          xs: `calc(100% - ${adminDrawerWidth}px)`,
        },
        height: '100%',
      }}
    >
      <Toolbar />
      <Box
        sx={{
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
