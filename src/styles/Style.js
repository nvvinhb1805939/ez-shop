import { createTheme } from '@mui/material';

const COLOR = {
  primary: '#4caf50',
  secondary: '#1976d2',
  contrastText: '#fff',
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLOR.primary,
      contrastText: COLOR.contrastText,
    },
    secondary: {
      main: COLOR.secondary,
      contrastText: COLOR.contrastText,
    },
  },
});

export default theme;
