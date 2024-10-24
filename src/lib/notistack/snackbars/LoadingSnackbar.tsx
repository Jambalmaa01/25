import { forwardRef } from 'react';
import { SnackbarContent, CustomContentProps } from 'notistack';
import { Alert } from '@mui/material';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';

interface LoadingSnackbarProps extends CustomContentProps {}

export const LoadingSnackbar = forwardRef<HTMLDivElement, LoadingSnackbarProps>(
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
