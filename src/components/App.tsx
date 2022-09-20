import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
// context
import ColorModeContext from '../context/useThemeContext';
// components
import Main from './Main';

const queryClient = new QueryClient()

function App(): JSX.Element {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <QueryClientProvider client={queryClient}>
        <ColorModeContext.Provider value={colorMode}> 
          <ThemeProvider theme={theme}>
            <div className="App">
              <Main />
            </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
