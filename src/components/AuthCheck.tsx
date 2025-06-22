import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/slices/authSlice';
import { AppDispatch, RootState } from '../store/types';
import { getCookie } from '../utils/cookies';

interface AuthCheckProps {
  children: ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  // Проверяем токен и в cookies, и в localStorage
  const accessToken = getCookie('accessToken') || localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken && !isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, accessToken, isAuthenticated]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return <>{children}</>;
} 