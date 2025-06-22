import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/types';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  if (!isAuth) return <Navigate to="/login" />;
  return <>{children}</>;
} 