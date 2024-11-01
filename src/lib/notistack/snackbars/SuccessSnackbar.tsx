import { forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent, CustomContentProps } from 'notistack';
import { Alert } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export const SuccessSnackbar = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, message }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContent ref={ref}>
        <Alert
          severity='success'
          icon={<CheckCircleOutlineOutlinedIcon />}
          onClose={handleDismiss}
        >
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);

SuccessSnackbar.displayName = 'SuccessSnackbar';
