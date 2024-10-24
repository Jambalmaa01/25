import { createTheme } from '@mui/material/styles';
import * as typography from './typography';
import * as components from './components';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#29465B',
    },
  },
  colorSchemes: {
    light: {
      palette: {
        AppBar: {
          defaultBg: 'white',
          // darkBg: 'white',
          // darkColor: '#121212',
        },
      },
    },
    dark: {
      palette: {
        // primary: {
        //   // main: '#000',
        // },
        AppBar: {
          darkBg: '#121212',
        },
      },
    },
  },
  typography,
  components,
});
