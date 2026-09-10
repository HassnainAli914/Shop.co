import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import GuestGuard from 'utils/route-guard/GuestGuard';

// maintenance routing
const LoginPage = Loadable(lazy(() => import('views/pages/authentication/Login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: (
    <GuestGuard>
      <MinimalLayout />
    </GuestGuard>
  ),
  children: [
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: '/pages/login',
      element: <LoginPage />
    }
  ]
};

export default AuthenticationRoutes;
