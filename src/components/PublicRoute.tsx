import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from '../hooks/redux';

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
} 