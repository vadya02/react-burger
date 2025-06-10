import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router';

interface ProtectedRouteElementProps {
  element: ReactElement;
}

export default function ProtectedRouteElement({ element }: ProtectedRouteElementProps) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
} 