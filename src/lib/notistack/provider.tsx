'use client';

import { SnackbarProvider } from 'notistack';
import { PropsWithChildren } from 'react';
import {
  DefaultSnackbar,
  ErrorSnackbar,
  InfoSnackbar,
  LoadingSnackbar,
  SuccessSnackbar,
  WarningSnackbar,
} from './snackbars';

declare module 'notistack' {
  interface VariantOverrides {
    loading: true;
  }
}

export type NotistackProviderProps = PropsWithChildren<{}>;

export function NotistackProvider(props: NotistackProviderProps) {
  const { children } = props;

  return (
    <SnackbarProvider
      dense
      maxSnack={8}
      preventDuplicate={false}
      Components={{
        default: DefaultSnackbar,
        error: ErrorSnackbar,
        info: InfoSnackbar,
        loading: LoadingSnackbar,
        success: SuccessSnackbar,
        warning: WarningSnackbar,
      }}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
}
