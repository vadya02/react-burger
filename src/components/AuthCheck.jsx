import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/slices/authSlice';
import { getCookie } from '../utils/cookies';
import PropTypes from 'prop-types';

export default function AuthCheck({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

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

  return children;
}

AuthCheck.propTypes = {
  children: PropTypes.node.isRequired,
}; 