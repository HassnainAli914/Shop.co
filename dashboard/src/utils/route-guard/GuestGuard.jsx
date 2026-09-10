import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Guest guard for login route
 * If admin is already authenticated, automatically redirect to dashboard
 */
export default function GuestGuard({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('admin_user') || '{}');
    } catch (e) {}

    const hasAdminAccess = Boolean(
      token &&
      user &&
      (user.role === 'admin' || user.email?.includes('admin') || user.uid === 'admin_default' || user.uid === 'admin_local')
    );

    if (hasAdminAccess) {
      navigate('/dashboard/default', { replace: true });
    }
  }, [navigate]);

  return children;
}

GuestGuard.propTypes = {
  children: PropTypes.node
};
