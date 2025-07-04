import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchUser } from '../store/slices/authSlice';
import { getAccessToken } from '../utils/cookies';

interface AuthCheckProps {
  children: ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken && !isAuthenticated) {
      console.log('[AuthCheck] Проверка аутентификации с токеном');
      dispatch(fetchUser());
    }
  }, [dispatch, accessToken, isAuthenticated]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return <>{children}</>;
} 