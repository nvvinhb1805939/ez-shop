import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Header from 'components/Header';
import Sizing from 'constant/sizing';
import ProductFeature from 'features/Product';
import { Route, Routes } from 'react-router-dom';
import theme from './styles/Style';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      <Box component='main' sx={{ py: 4, mt: `${Sizing.HEADER_HEIGHT}px`, bgcolor: 'background.main' }}>
        <Routes>
          <Route path='/*' element={<ProductFeature />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
