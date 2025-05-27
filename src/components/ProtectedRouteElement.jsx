import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRouteElement({ onlyUnAuth = false, children }) {
  const isAuth = useSelector(state => state.auth.isAuth);
  const isUserLoading = useSelector(state => state.auth.isUserLoading);
  const location = useLocation();

  if (isUserLoading) return null;

  if (onlyUnAuth && isAuth) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

ProtectedRouteElement.propTypes = {
  onlyUnAuth: PropTypes.bool,
  children: PropTypes.node.isRequired,
}; 