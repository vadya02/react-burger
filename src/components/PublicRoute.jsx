import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
}; 