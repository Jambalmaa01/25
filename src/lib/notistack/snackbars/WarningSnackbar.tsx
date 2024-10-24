import { forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent, CustomContentProps } from 'notistack';
import { Alert } from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

interface WarningSnackbarProps extends CustomContentProps {}

export const WarningSnackbar = forwardRef<HTMLDivElement, WarningSnackbarProps>(
  ({ id, message }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref}>
        <Alert
          severity='warning'
          icon={<WarningAmberOutlinedIcon />}
          onClose={() => handleDismiss()}
        >
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);

WarningSnackbar.displayName = 'WarningSnackbar';
