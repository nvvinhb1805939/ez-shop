import { ThemeProvider } from '@mui/system';
import theme from './styles/Style';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>app</div>
    </ThemeProvider>
  );
}

export default App;
