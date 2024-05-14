import React from 'react';
import ReactDOM from 'react-dom/client';
import { addInterceptors } from './utils/axiosApi';
import { router } from './router/Router';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import {RouterProvider} from 'react-router-dom';
import { Provider } from 'react-redux';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
);