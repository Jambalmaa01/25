import { Components } from '@mui/material/styles';
import { MuiButton } from './MuiButton';

export const MuiLoadingButton: Components['MuiButton'] = {
  ...MuiButton,
  defaultProps: {
    ...MuiButton?.defaultProps,
    type: 'submit',
    color: 'primary',
    fullWidth: true,
  },
};
