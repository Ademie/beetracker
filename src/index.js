import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import '../src/theme/style.css';
import { AuthContextProvider } from './context/AuthContext';
import { Provider } from "react-redux";
import store from './redux/store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
      <ColorModeScript />      
        <App />
      </Provider>
    </AuthContextProvider>
  </StrictMode>
);
