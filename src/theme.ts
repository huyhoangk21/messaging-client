import { createTheme } from '@mui/material';

type CssVariables = {
  background: {
    gradient: string;
  };
};

export const cssVariables: CssVariables = {
  background: {
    gradient:
      'linear-gradient(90deg, rgba(241,200,132,1) 0%, rgba(244,177,75,1) 50%, rgba(214,142,22,1) 100%);',
  },
};

export const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      light: '#f1c884',
      main: '#f4b14b',
      dark: '#d68e16',
      contrastText: '#fff',
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          background: cssVariables.background.gradient,
        },
      },
    },
  },
});
