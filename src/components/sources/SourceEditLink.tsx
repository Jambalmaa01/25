import { Path } from '@/variables';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import Link from 'next/link';
import { replacePath } from '@/utils';
import BrushIcon from '@mui/icons-material/Brush';

export type SourceEditLinkProps = LoadingButtonProps & {
  href: Path;
  replaces?: {
    [key: string]: string;
  };
};

export function SourceEditLink(props: SourceEditLinkProps) {
  const { href, replaces, children, ...rest } = props;

  return (
    <LoadingButton
      type='button'
      LinkComponent={Link}
      href={replacePath(href, replaces)}
      startIcon={<BrushIcon />}
      fullWidth={false}
      color='info'
      {...rest}
    >
      {children ? children : 'Засах'}
    </LoadingButton>
  );
}
