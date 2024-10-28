'use client';

import { IconButton, TextField, TextFieldProps } from '@mui/material';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import ClearIcon from '@mui/icons-material/Clear';

export type SourceSelectFieldProps = TextFieldProps & {
  onSelect(): void;
  onClear(): void;
};

export function SourceSelectField(props: SourceSelectFieldProps) {
  const { onSelect, onClear, disabled, ...rest } = props;

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <IconButton disabled={disabled} onClick={onSelect} sx={{ mr: 1 }}>
            <OpenInBrowserIcon />
          </IconButton>
        ),
        endAdornment: (
          <IconButton onClick={onClear}>
            <ClearIcon />
          </IconButton>
        ),
        readOnly: true,
      }}
      disabled={disabled}
      {...rest}
    />
  );
}
