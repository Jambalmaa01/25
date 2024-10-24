import { forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent, CustomContentProps } from 'notistack';
import { Alert } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

interface SuccessSnackbarProps extends CustomContentProps {}

export const SuccessSnackbar = forwardRef<HTMLDivElement, SuccessSnackbarProps>(
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
