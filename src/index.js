import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import '../src/theme/style.css';
import { AuthContextProvider } from './context/AuthContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <AuthContextProvider>
      <ColorModeScript />
      <App />
    </AuthContextProvider>
  </StrictMode>
);
