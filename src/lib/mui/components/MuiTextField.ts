import { Components } from '@mui/material/styles';

export const MuiTextField: Components['MuiTextField'] = {
  defaultProps: {
    size: 'small',
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  },
};
