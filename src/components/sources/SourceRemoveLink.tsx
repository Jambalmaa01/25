import { Path } from '@/variables';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import Link from 'next/link';
import { replacePath } from '@/utils';
import DeleteIcon from '@mui/icons-material/Delete';

export type SourceRemoveLinkProps = LoadingButtonProps & {
  href: Path;
  replaces?: {
    [key: string]: string;
  };
};

export function SourceRemoveLink(props: SourceRemoveLinkProps) {
  const { href, replaces, children, ...rest } = props;

  return (
    <LoadingButton
      type='button'
      LinkComponent={Link}
      href={replacePath(href, replaces)}
      startIcon={<DeleteIcon />}
      fullWidth={false}
      color='error'
      {...rest}
    >
      {children ? children : 'Устгах'}
    </LoadingButton>
  );
}
