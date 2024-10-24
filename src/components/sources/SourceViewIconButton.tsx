'use client';

import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export type SourceViewIconButtonProps = IconButtonProps;

export function SourceViewIconButton(props: SourceViewIconButtonProps) {
  const { ...rest } = props;
  return (
    <Tooltip title='Харах'>
      <IconButton {...rest}>
        <RemoveRedEyeIcon />
      </IconButton>
    </Tooltip>
  );
}
