import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export type SourceRemoveForeverButtonProps = LoadingButtonProps;

export function SourceRemoveForeverButton(
  props: SourceRemoveForeverButtonProps
) {
  const { href, children, ...rest } = props;

  return (
    <LoadingButton
      type='button'
      startIcon={<DeleteForeverIcon />}
      fullWidth={false}
      variant='contained'
      color='error'
      {...rest}
    >
      {children ? children : 'Баазаас устгах'}
    </LoadingButton>
  );
}
