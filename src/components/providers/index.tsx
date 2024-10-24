import { JotaiProvider } from '@/lib/jotai/provider';
import { MuiProvider } from '@/lib/mui/provider';
import { NotistackProvider } from '@/lib/notistack/provider';
import { QueryProvider } from '@/lib/query/provider';
import { TRPCProvider } from '@/lib/trpc/provider';
import { ReactNode } from 'react';

export type ProvidersProps = {
  children: ReactNode;
};

export function Providers(props: ProvidersProps) {
  const { children } = props;

  return (
    <MuiProvider>
      <NotistackProvider>
        <JotaiProvider>
          <TRPCProvider>
            <QueryProvider>{children}</QueryProvider>
          </TRPCProvider>
        </JotaiProvider>
      </NotistackProvider>
    </MuiProvider>
  );
}
