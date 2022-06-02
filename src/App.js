import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Header from 'components/Header';
import ProductFeature from 'features/Product';
import { Route, Routes } from 'react-router-dom';
import theme from './styles/Style';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />

      <Routes>
        <Route path='/*' element={<ProductFeature />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
