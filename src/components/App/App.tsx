import React from 'react';
import Main from '../Main/Main';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Main />
      </div>
    </QueryClientProvider>
  );
}

export default App;
