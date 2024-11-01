import { forwardRef } from 'react';
import { SnackbarContent, CustomContentProps } from 'notistack';
import { Alert } from '@mui/material';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';

export const LoadingSnackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ message }, ref) => {
    return (
      <SnackbarContent ref={ref}>
        <Alert severity='info' icon={<HourglassBottomOutlinedIcon />}>
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);

LoadingSnackbar.displayName = 'LoadingSnackbar';
