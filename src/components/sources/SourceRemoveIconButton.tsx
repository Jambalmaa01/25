'use client';

import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export type SourceRemoveIconButtonProps = IconButtonProps;

export function SourceRemoveIconButton(props: SourceRemoveIconButtonProps) {
  const { ...rest } = props;
  return (
    <Tooltip title='Устгах'>
      <IconButton {...rest}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
