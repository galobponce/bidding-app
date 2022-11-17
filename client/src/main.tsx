import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from "./chakra";
import { globalStore } from './store';
import GlobalRouter from './GlobalRouter';
import { Toast } from './common/components';

import './index.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={globalStore}>
      <ChakraProvider theme={theme}>
        <Toast />
        <GlobalRouter />
      </ChakraProvider>  
    </Provider>
  </React.StrictMode>
);
