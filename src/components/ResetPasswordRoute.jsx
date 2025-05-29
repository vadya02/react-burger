import { Navigate, useLocation } from 'react-router';
import PropTypes from 'prop-types';

export default function ResetPasswordRoute({ children }) {
  const location = useLocation();
  const hasResetToken = sessionStorage.getItem('resetToken');

  if (!hasResetToken) {
    return <Navigate to="/forgot-password" state={{ from: location }} replace />;
  }

  return children;
}

ResetPasswordRoute.propTypes = {
  children: PropTypes.node.isRequired,
}; 