import { Components } from '@mui/material/styles';

export const MuiTableCell: Components['MuiTableCell'] = {
  styleOverrides: {
    root: {
      fontSize: 13,
      textWrap: 'nowrap',
    },
    head: {
      fontWeight: 600,
      textTransform: 'uppercase',
      fontSize: 11,
      // color: '#9E9E9E',
      textWrap: 'nowrap',
    },
    stickyHeader: {
      background: 'transparent',
      backdropFilter: 'blur(10px)',
    },
  },
};
