import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import EditIcon from '@mui/icons-material/Edit';

export type EditFormButtonProps = Omit<LoadingButtonProps, 'loading'> & {
  loading: boolean;
};

export function EditFormButton(props: EditFormButtonProps) {
  const { children, loading, ...rest } = props;

  return (
    <LoadingButton
      type='submit'
      startIcon={<EditIcon />}
      fullWidth={true}
      loading={loading}
      {...rest}
    >
      {children ? children : 'Засах'}
    </LoadingButton>
  );
}
