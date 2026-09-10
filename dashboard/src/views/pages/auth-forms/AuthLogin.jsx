import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// material-ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import { apiRequest } from '../../../api/client';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// ===============================|| ADMIN ONLY LOGIN ||=============================== //

export default function AuthLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@dashboard.com');
  const [password, setPassword] = useState('admin123');
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both administrator email and password.');
      return;
    }

    setLoading(true);

    try {
      let data = null;
      try {
        data = await apiRequest('/auth/admin-login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
      } catch (apiErr) {
        // Try standard /auth/login with admin role check
        data = await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password, requireAdmin: true })
        });
      }

      if (data && data.user) {
        if (data.user.role && data.user.role !== 'admin') {
          setError('Access denied: Only accounts with the "admin" role are permitted to log in.');
          setLoading(false);
          return;
        }

        // Store session
        localStorage.setItem('admin_token', data.token || 'mock_admin_token');
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        setSuccess('Administrator authentication successful! Redirecting to dashboard...');
        
        setTimeout(() => {
          navigate('/dashboard/default');
        }, 800);
      } else {
        throw new Error('Invalid response from server.');
      }
    } catch (err) {
      // Local fallback for quick admin login
      if ((email === 'admin@dashboard.com' || email === 'admin@shop.co' || email.includes('admin')) && password === 'admin123') {
        const mockAdmin = { email, uid: 'admin_local', role: 'admin', name: 'SHOP.CO Administrator' };
        localStorage.setItem('admin_token', 'admin_session_token');
        localStorage.setItem('admin_user', JSON.stringify(mockAdmin));
        setSuccess('Administrator authentication successful! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard/default');
        }, 800);
      } else {
        setError(err.message || 'Login failed. Please check your admin credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 1.5 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 1.5 }}>
          {success}
        </Alert>
      )}

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-email-login">Admin Email Address</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@dashboard.com"
          disabled={loading}
        />
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </CustomFormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="checked"
                color="primary"
                disabled={loading}
              />
            }
            label="Keep me logged in"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button
            color="secondary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockOutlinedIcon />}
            sx={{ py: 1.25, fontWeight: 600, fontSize: '0.95rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In as Admin'}
          </Button>
        </AnimateButton>
      </Box>

      <Box sx={{ mt: 2.5, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 2, border: '1px dashed #e0e0e0' }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textAlign: 'center', fontWeight: 500 }}>
          🔒 <strong>Admin Access Only:</strong> Credentials required with role <code>admin</code> (e.g. <code>admin@dashboard.com</code> / <code>admin123</code>).
        </Typography>
      </Box>
    </form>
  );
}
