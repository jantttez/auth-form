import { LoginPage } from '@pages/login';
import { RegisterPage } from '@pages/register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <div>main</div>,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
