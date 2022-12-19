import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
const Login = Loadable(lazy(() => import('./Login')));
const Register = Loadable(lazy(() => import('./Register')));
const sessionRoutes = [
  { path: '/session/signin', element: <Login /> },
  { path: '/session/signup', element: <Register /> },
  { path: '/session/404', element: <NotFound /> },
];

export default sessionRoutes;
