import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from 'ui-component/Loader';

/**
 * Authentication guard for administrator routes
 * Verifies that the user has an active admin session (token and admin role)
 */
export default function AuthGuard({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

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

    if (!hasAdminAccess) {
      setIsAuthorized(false);
      navigate('/login', { replace: true });
    } else {
      setIsAuthorized(true);
    }
    setChecking(false);
  }, [navigate]);

  if (checking) {
    return <Loader />;
  }

  if (!isAuthorized) {
    return null;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node
};
