import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';

export type SourceAddButtonProps = LoadingButtonProps;

export function SourceAddButton(props: SourceAddButtonProps) {
  const { href, children, ...rest } = props;

  return (
    <LoadingButton
      type='button'
      startIcon={<AddIcon />}
      fullWidth={false}
      variant='contained'
      color='success'
      {...rest}
    >
      {children ? children : 'Бүртгэх'}
    </LoadingButton>
  );
}
