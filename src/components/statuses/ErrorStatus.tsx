import { Typography } from '@mui/material';

export type ErrorStatusProps = {
  error: any;
};

export function ErrorStatus(props: ErrorStatusProps) {
  const { error } = props;

  return (
    <Typography textAlign={'center'} variant='body2'>
      Алдаа гарлаа: {error?.message}
    </Typography>
  );
}
