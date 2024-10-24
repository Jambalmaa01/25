import { Path } from '@/variables';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import Link from 'next/link';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export type BackLinkProps = LoadingButtonProps & {
  href: Path;
};

export function BackLink(props: BackLinkProps) {
  const { href } = props;

  return (
    <LoadingButton
      LinkComponent={Link}
      href={href}
      variant='text'
      startIcon={<KeyboardBackspaceIcon />}
      fullWidth
    >
      Буцах
    </LoadingButton>
  );
}
