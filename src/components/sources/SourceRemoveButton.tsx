import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';

export type SourceRemoveButtonProps = LoadingButtonProps;

export function SourceRemoveButton(props: SourceRemoveButtonProps) {
  const { children, ...rest } = props;

  return (
    <LoadingButton
      type='button'
      startIcon={<DeleteIcon />}
      fullWidth={false}
      variant='contained'
      color='error'
      {...rest}
    >
      {children ? children : 'Устгах'}
    </LoadingButton>
  );
}
