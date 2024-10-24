'use client';

import { type ReactNode } from 'react';
import { trpc } from './trpc';
import { trpcClient } from './client';
import { queryClient } from '@/lib/query/client';

export type TRPCProviderProps = {
  children: ReactNode;
};

export function TRPCProvider(props: TRPCProviderProps) {
  const { children } = props;

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      {children}
    </trpc.Provider>
  );
}
