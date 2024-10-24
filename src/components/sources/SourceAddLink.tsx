import { Path } from '@/variables';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';

export type SourceAddLinkProps = LoadingButtonProps & {
  href: Path;
};

export function SourceAddLink(props: SourceAddLinkProps) {
  const { href, children, ...rest } = props;

  return (
    <LoadingButton
      type='button'
      LinkComponent={Link}
      href={href}
      startIcon={<AddIcon />}
      fullWidth={false}
      variant='text'
      {...rest}
    >
      {children ? children : 'Бүртгэх'}
    </LoadingButton>
  );
}
