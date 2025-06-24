import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface ProtectedRouteProps {
  children: ReactNode;
  anonymous?: boolean;
}

export default function ProtectedRoute({ children, anonymous = false }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && isAuthenticated) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
} 