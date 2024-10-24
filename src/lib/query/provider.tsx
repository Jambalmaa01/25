'use client';

import { type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './client';

type QueryProviderProps = {
  children: ReactNode;
};

export function QueryProvider(props: QueryProviderProps) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
