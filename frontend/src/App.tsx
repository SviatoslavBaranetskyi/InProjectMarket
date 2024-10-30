import * as React from 'react';
import { AuthContextProvider } from '@context/AuthContext/auth.context.tsx';
import { MainPages } from './pages/app.pages.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { appTheme } from './constants/mui.constants.ts';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={appTheme}>
        <AuthContextProvider>
          <MainPages />
        </AuthContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
