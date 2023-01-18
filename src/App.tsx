import React from 'react';
import { GlobalStyle } from './config';
import { AppRoutes } from './routes';

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppRoutes />
    </React.Fragment>
  );
}

export default App;

