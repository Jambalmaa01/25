import { Typography, TypographyProps } from '@mui/material';

export type ActionTypographyProps = TypographyProps;

export function ActionTypography(props: ActionTypographyProps) {
  const { children } = props;

  return (
    <Typography variant='button' color='primary' fontSize={16}>
      {children}
    </Typography>
  );
}
