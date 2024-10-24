import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export type BackButtonProps = LoadingButtonProps;

export function BackButton(props: BackButtonProps) {
  const { ...rest } = props;

  return (
    <LoadingButton
      variant='text'
      startIcon={<KeyboardBackspaceIcon />}
      fullWidth
      {...rest}
    >
      Буцах
    </LoadingButton>
  );
}
