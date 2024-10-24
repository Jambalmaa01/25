'use client';

import { ReactNode } from 'react';
import { Provider } from 'jotai';

export type JotaiProviderProps = {
  children: ReactNode;
};

export function JotaiProvider(props: JotaiProviderProps) {
  const { children } = props;

  return <Provider>{children}</Provider>;
}
