'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { theme } from '@/lib/mui/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export type MuiProviderProps = {
  children: ReactNode;
};

export function MuiProvider(props: MuiProviderProps) {
  const { children } = props;

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <InitColorSchemeScript attribute='class' />
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
