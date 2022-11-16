import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from "./chakra";
import GlobalRouter from './GlobalRouter';

import './index.css';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GlobalRouter />
    </ChakraProvider>  
  </React.StrictMode>
);
