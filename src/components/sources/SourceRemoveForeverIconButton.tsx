'use client';

import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export type SourceRemoveForeverIconButtonProps = IconButtonProps;

export function SourceRemoveForeverIconButton(
  props: SourceRemoveForeverIconButtonProps
) {
  const { ...rest } = props;
  return (
    <Tooltip title='Баазаас устгах'>
      <IconButton {...rest}>
        <DeleteForeverIcon />
      </IconButton>
    </Tooltip>
  );
}
