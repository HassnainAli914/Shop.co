import { createBrowserRouter } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

let basename = import.meta.env.VITE_APP_BASE_NAME || '/';
if (typeof basename === 'string' && (basename.startsWith('http://') || basename.startsWith('https://'))) {
  try {
    basename = new URL(basename).pathname || '/';
  } catch {
    basename = '/';
  }
}
if (basename && !basename.startsWith('/')) {
  basename = `/${basename}`;
}

const router = createBrowserRouter(
  [MainRoutes, AuthenticationRoutes],
  basename && basename !== '/' ? { basename } : undefined
);

export default router;
