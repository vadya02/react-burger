import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

interface ResetPasswordRouteProps {
  children: ReactNode;
}

export default function ResetPasswordRoute({ children }: ResetPasswordRouteProps) {
  const location = useLocation();
  const hasResetToken = sessionStorage.getItem('resetToken');

  if (!hasResetToken) {
    return <Navigate to="/forgot-password" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 