import React from 'react';
import { AppRouter, UiProvider } from './providers';

export const App: React.FC = () => {
  return (
    <UiProvider>
      <AppRouter />
    </UiProvider>
  );
};
