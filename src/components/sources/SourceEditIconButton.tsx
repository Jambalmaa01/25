'use client';

import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';

export type SourceEditIconButtonProps = IconButtonProps;

export function SourceEditIconButton(props: SourceEditIconButtonProps) {
  const { ...rest } = props;
  return (
    <Tooltip title='Засах'>
      <IconButton {...rest}>
        <BrushIcon />
      </IconButton>
    </Tooltip>
  );
}
