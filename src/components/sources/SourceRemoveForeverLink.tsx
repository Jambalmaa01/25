import { Path } from '@/variables';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import Link from 'next/link';
import { replacePath } from '@/utils';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export type SourceRemoveForeverLinkProps = LoadingButtonProps & {
  href: Path;
  replaces?: {
    [key: string]: string;
  };
};

export function SourceRemoveForeverLink(props: SourceRemoveForeverLinkProps) {
  const { href, replaces, children, ...rest } = props;

  return (
    <LoadingButton
      type='button'
      LinkComponent={Link}
      href={replacePath(href, replaces)}
      startIcon={<DeleteForeverIcon />}
      fullWidth={false}
      color='error'
      {...rest}
    >
      {children ? children : 'Баазаас устгах'}
    </LoadingButton>
  );
}
