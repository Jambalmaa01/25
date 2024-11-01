import { Typography } from '@mui/material';
import { TRPCClientErrorLike } from '@trpc/client';
import { AnyProcedure } from '@trpc/server';

export type ErrorStatusProps = {
  error: TRPCClientErrorLike<AnyProcedure>;
};

export function ErrorStatus(props: ErrorStatusProps) {
  const { error } = props;

  return (
    <Typography textAlign={'center'} variant='body2'>
      Алдаа гарлаа: {error?.message}
    </Typography>
  );
}
