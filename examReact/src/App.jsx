import { routes } from './routes';
import { ThemeProvider } from '@mui/system';
import { RouterProvider } from 'react-router-dom';
import { theme } from '../server/backend/src/themes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />;
    </ThemeProvider>
  );
};

export default App;
