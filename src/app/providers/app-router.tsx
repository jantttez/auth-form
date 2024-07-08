import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <div>login</div>,
  },
  {
    path: '/register',
    element: <div>register</div>,
  },
  {
    path: '/',
    element: <div>main</div>,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
