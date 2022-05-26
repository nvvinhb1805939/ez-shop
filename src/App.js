import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Header from 'components/Header';
import theme from './styles/Style';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
    </ThemeProvider>
  );
}

export default App;
