import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export type RemoveForeverFormButtonProps = Omit<
  LoadingButtonProps,
  'loading'
> & {
  loading: boolean;
};

export function RemoveForeverFormButton(props: RemoveForeverFormButtonProps) {
  const { children, loading, ...rest } = props;

  return (
    <LoadingButton
      type='submit'
      startIcon={<DeleteForeverIcon />}
      fullWidth={true}
      loading={loading}
      {...rest}
    >
      {children ? children : 'Баазаас устгах'}
    </LoadingButton>
  );
}
