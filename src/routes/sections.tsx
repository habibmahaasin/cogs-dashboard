import { lazy, ReactNode, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const InventoryPage = lazy(() => import('src/pages/inventory'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const RecipePage = lazy(() => import('src/pages/recipe'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AuthCallback = lazy(() => import('src/pages/auth-callback'));

// ----------------------------------------------------------------------

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

const isAuthenticated = () => !!localStorage.getItem('token');

const PrivateRoute = ({ children }: { children: ReactNode }) =>
  isAuthenticated() ? children : <Navigate to="/sign-in" replace />;

const PublicRoute = ({ children }: { children: ReactNode }) =>
  isAuthenticated() ? <Navigate to="/" replace /> : children;

export function Router() {
  return useRoutes([
    {
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense fallback={renderFallback}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        { element: <InventoryPage />, index: true },
        { path: 'recipe', element: <RecipePage /> },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <PublicRoute>
          <AuthLayout>
            <SignInPage />
          </AuthLayout>
        </PublicRoute>
      ),
    },
    {
      path: 'auth/callback',
      element: (
        <AuthLayout>
          <AuthCallback />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
