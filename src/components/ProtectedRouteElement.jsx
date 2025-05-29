import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';

export default function ProtectedRouteElement({ element }) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired
}; 