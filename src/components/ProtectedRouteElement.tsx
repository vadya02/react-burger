import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from '../hooks/redux';

interface ProtectedRouteElementProps {
  element: ReactElement;
}

export default function ProtectedRouteElement({ element }: ProtectedRouteElementProps) {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
} 