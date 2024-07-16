import { AppRouter, UiProvider } from './providers';

export const App = () => {
  return (
    <UiProvider>
      <AppRouter />
    </UiProvider>
  );
};
