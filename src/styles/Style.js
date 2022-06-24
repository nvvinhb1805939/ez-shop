import { createTheme } from '@mui/material';
import Palette from 'constant/palette';

const theme = createTheme({
  palette: {
    background: {
      main: Palette.BACKGROUND,
    },
    primary: {
      main: Palette.PRIMARY,
      contrastText: Palette.CONTRAST_TEXT,
    },
    secondary: {
      main: Palette.SECONDARY,
      contrastText: Palette.CONTRAST_TEXT,
    },
  },
});

export default theme;
