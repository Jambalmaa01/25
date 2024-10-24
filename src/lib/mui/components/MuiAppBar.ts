import { Components } from '@mui/material/styles';

export const MuiAppBar: Components['MuiAppBar'] = {
  defaultProps: {
    enableColorOnDark: true,
    color: 'default',
    elevation: 0,
    variant: 'outlined',
  },
  styleOverrides: {
    root: {
      borderRight: 'none',
      borderLeft: 'none',
    },
  },
};
