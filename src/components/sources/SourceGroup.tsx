'use client';

import { Stack, StackProps, useMediaQuery, useTheme } from '@mui/material';

export type SourceGroupProps = StackProps;

export function SourceGroup(props: SourceGroupProps) {
  const { children, ...rest } = props;
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Stack direction={xs ? 'column' : 'row'} spacing={0.5} {...rest}>
      {children}
    </Stack>
  );
}
