import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';

export type RemoveFormButtonProps = Omit<LoadingButtonProps, 'loading'> & {
  loading: boolean;
};

export function RemoveFormButton(props: RemoveFormButtonProps) {
  const { children, loading, ...rest } = props;

  return (
    <LoadingButton
      type='submit'
      startIcon={<DeleteIcon />}
      fullWidth={true}
      loading={loading}
      {...rest}
    >
      {children ? children : 'Устгах'}
    </LoadingButton>
  );
}
