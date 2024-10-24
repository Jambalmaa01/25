import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';

export type AddFormButtonProps = Omit<LoadingButtonProps, 'loading'> & {
  loading: boolean;
};

export function AddFormButton(props: AddFormButtonProps) {
  const { children, loading, ...rest } = props;

  return (
    <LoadingButton
      type='submit'
      startIcon={<AddIcon />}
      fullWidth={true}
      loading={loading}
      {...rest}
    >
      {children ? children : 'Бүртгэх'}
    </LoadingButton>
  );
}
