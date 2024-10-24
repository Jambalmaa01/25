import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { Providers } from '@/components/providers';
import '@fontsource/inter';

export const metadata: Metadata = {
  title: 'Khilchin25',
  description: 'Khilchin25',
};

export type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
