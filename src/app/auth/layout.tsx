import { Container, Paper } from '@mui/material';
import { ReactNode } from 'react';

export type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <Container maxWidth='xs' sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>{children}</Paper>
    </Container>
  );
}
