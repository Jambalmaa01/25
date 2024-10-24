import { Toolbar } from '@mui/material';
import { ReactNode } from 'react';

export type SourceToolbarProps = {
  children: ReactNode;
};

export function SourceToolbar(props: SourceToolbarProps) {
  const { children } = props;

  return (
    <Toolbar
      variant='dense'
      disableGutters
      sx={{
        // p: 2,
        gap: 1,
        position: 'sticky',
        // top: xs ? 48 : 64,
        // background: 'rgba(255, 255, 255, 0)',
        // borderRadius: '16px',
        // boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(4.4px)',
        WebkitBackdropFilter: 'blur(4.4px)',
        zIndex: 1,
        mb: 1,
      }}
    >
      {children}
    </Toolbar>
  );
}
