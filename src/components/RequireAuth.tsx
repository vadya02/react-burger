import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
 
export default function RequireAuth({ children }: { children: ReactNode }) {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  if (!isAuth) return <Navigate to="/login" />;
  return <>{children}</>;
} 