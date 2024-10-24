import { Components } from '@mui/material/styles';

export const MuiBackdrop: Components['MuiBackdrop'] = {
  styleOverrides: {
    root: {
      backdropFilter: 'blur(10px)',
      // background: 'rgba(255, 255, 255, 0.2)',
    },
  },
};
