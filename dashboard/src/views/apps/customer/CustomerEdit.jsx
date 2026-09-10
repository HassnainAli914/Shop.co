import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

// project imports
import BreadcrumbHeader from './BreadcrumbHeader';
import { getCustomerById, updateCustomer } from './customerData';

// assets
import { IconTrash, IconUpload } from '@tabler/icons-react';

// ==============================|| EDIT CUSTOMER PAGE ||============================== //

export default function CustomerEdit() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: 'Caroline',
    lastName: 'Pandolfi',
    userName: 'caroline_pandolfi',
    email: 'caroline1@gmail.com',
    countryCode: 'US',
    phone: '6187873453',
    address: 'Florida Square, Wouruno',
    pinCode: '393010',
    city: 'New York',
    country: 'United States',
    notes: 'Sample description text for user profile.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      const customer = getCustomerById(id);
      if (customer) {
        setFormData({
          firstName: customer.firstName || customer.name?.split(' ')[0] || '',
          lastName: customer.lastName || customer.name?.split(' ').slice(1).join(' ') || '',
          userName: customer.userName || customer.email?.split('@')[0] || '',
          email: customer.email || '',
          countryCode: customer.countryCode || 'US',
          phone: customer.phone || '',
          address: customer.address || 'Florida Square, Wouruno',
          pinCode: customer.pinCode || '393010',
          city: customer.city || 'New York',
          country: customer.country || 'United States',
          notes: customer.notes || customer.about || 'Sample description text for user profile.',
          avatar: customer.avatar || ''
        });
      }
    }
  }, [id]);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePicture = () => {
    setFormData((prev) => ({ ...prev, avatar: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = true;
    if (!formData.lastName.trim()) errs.lastName = true;
    if (!formData.userName.trim()) errs.userName = true;
    if (!formData.email.trim()) errs.email = true;
    if (!formData.phone.trim()) errs.phone = true;
    if (!formData.address.trim()) errs.address = true;
    if (!formData.pinCode.trim()) errs.pinCode = true;
    if (!formData.city.trim()) errs.city = true;
    if (!formData.country.trim()) errs.country = true;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updated = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      userName: formData.userName,
      email: formData.email,
      phone: formData.phone,
      countryCode: formData.countryCode,
      address: formData.address,
      pinCode: formData.pinCode,
      city: formData.city,
      country: formData.country,
      notes: formData.notes,
      avatar: formData.avatar
    };

    updateCustomer(id || '1', updated);
    setSuccess(true);
    setTimeout(() => {
      navigate(`/customer/details/${id || '1'}`);
    }, 1000);
  };

  const labelSx = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#424242',
    mb: 0.75,
    display: 'block'
  };

  return (
    <Box>
      {/* Top Header & Breadcrumbs */}
      <BreadcrumbHeader title="Edit" current="Edit" />

      {/* Main Form Card */}
      <Card
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 2,
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: '#212121' }}>
          Edit Customer
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Customer updated successfully! Redirecting to details...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Section 1: Profile Photo & Delete / Upload */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2.5}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            sx={{ pb: 3, borderBottom: '1px solid #f0f0f0' }}
          >
            <Stack direction="row" spacing={2.5} alignItems="center">
              <Avatar
                src={formData.avatar}
                alt={formData.firstName}
                sx={{ width: 68, height: 68, borderRadius: '50%' }}
              >
                {formData.firstName?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                  Personal Information
                </Typography>
                <Typography variant="caption" sx={{ color: '#757575' }}>
                  Add a profile picture (optional)
                </Typography>
              </Box>
            </Stack>

            {formData.avatar ? (
              <Button
                variant="outlined"
                color="error"
                startIcon={<IconTrash stroke={1.5} size="1.1rem" />}
                onClick={handleDeletePicture}
                sx={{
                  borderRadius: 1.5,
                  borderColor: '#ffcdd2',
                  color: '#f44336',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 2.5,
                  '&:hover': {
                    borderColor: '#f44336',
                    bgcolor: 'rgba(244, 67, 54, 0.04)'
                  }
                }}
              >
                Delete Picture
              </Button>
            ) : (
              <Button
                component="label"
                variant="outlined"
                startIcon={<IconUpload stroke={1.5} size="1.1rem" />}
                sx={{
                  borderRadius: 1.5,
                  borderColor: '#90caf9',
                  color: '#1e88e5',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 2.5
                }}
              >
                Upload Picture
                <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
              </Button>
            )}
          </Stack>

          {/* Section 2: Personal Information */}
          <Box sx={{ py: 3, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121' }}>
              Personal Information
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2.5,
                mb: 2.5
              }}
            >
              <Box>
                <FormLabel sx={labelSx}>
                  First Name <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  error={Boolean(errors.firstName)}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>

              <Box>
                <FormLabel sx={labelSx}>
                  Last Name <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  error={Boolean(errors.lastName)}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>

              <Box>
                <FormLabel sx={labelSx}>
                  User Name <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={formData.userName}
                  onChange={handleChange('userName')}
                  error={Boolean(errors.userName)}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>

              <Box>
                <FormLabel sx={labelSx}>
                  Email <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={Boolean(errors.email)}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>
            </Box>

            <Box>
              <FormLabel sx={labelSx}>
                Contact <span style={{ color: '#f44336' }}>*</span>
              </FormLabel>
              <OutlinedInput
                fullWidth
                size="small"
                value={formData.phone}
                onChange={handleChange('phone')}
                error={Boolean(errors.phone)}
                startAdornment={
                  <InputAdornment position="start">
                    <Select
                      value={formData.countryCode}
                      onChange={handleChange('countryCode')}
                      variant="standard"
                      disableUnderline
                      sx={{ fontSize: '0.875rem', mr: 1, fontWeight: 600 }}
                    >
                      <MenuItem value="US">US</MenuItem>
                      <MenuItem value="CA">CA</MenuItem>
                      <MenuItem value="UK">UK</MenuItem>
                    </Select>
                    <Divider orientation="vertical" flexItem sx={{ mr: 1.5, height: 20 }} />
                  </InputAdornment>
                }
                sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
              />
            </Box>
          </Box>

          {/* Section 3: Address Information */}
          <Box sx={{ py: 3, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121' }}>
              Address Information
            </Typography>

            <Box sx={{ mb: 2.5 }}>
              <FormLabel sx={labelSx}>
                Address <span style={{ color: '#f44336' }}>*</span>
              </FormLabel>
              <OutlinedInput
                fullWidth
                size="small"
                value={formData.address}
                onChange={handleChange('address')}
                error={Boolean(errors.address)}
                sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
              />
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                gap: 2.5
              }}
            >
              <Box>
                <FormLabel sx={labelSx}>
                  Pin Code <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={formData.pinCode}
                  onChange={handleChange('pinCode')}
                  error={Boolean(errors.pinCode)}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>

              <Box>
                <FormLabel sx={labelSx}>
                  City <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <FormControl fullWidth size="small" error={Boolean(errors.city)}>
                  <Select
                    value={formData.city}
                    onChange={handleChange('city')}
                    sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                  >
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                    <MenuItem value="Chicago">Chicago</MenuItem>
                    <MenuItem value="Austin">Austin</MenuItem>
                    <MenuItem value="Toronto">Toronto</MenuItem>
                    <MenuItem value="Vancouver">Vancouver</MenuItem>
                    <MenuItem value="Montreal">Montreal</MenuItem>
                    <MenuItem value="London">London</MenuItem>
                    <MenuItem value="Manchester">Manchester</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormLabel sx={labelSx}>
                  Country <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <FormControl fullWidth size="small" error={Boolean(errors.country)}>
                  <Select
                    value={formData.country}
                    onChange={handleChange('country')}
                    sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                  >
                    <MenuItem value="United States">United States</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Section 4: Additional Notes */}
          <Box sx={{ py: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121' }}>
              Additional Notes
            </Typography>

            <FormLabel sx={labelSx}>Notes</FormLabel>
            <OutlinedInput
              fullWidth
              multiline
              rows={4}
              value={formData.notes}
              onChange={handleChange('notes')}
              sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
            />
          </Box>

          {/* Footer Actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" sx={{ pt: 2 }}>
            <Button
              variant="text"
              onClick={() => navigate('/customer/list')}
              sx={{ color: '#f44336', textTransform: 'none', fontWeight: 600 }}
            >
              Discard
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#f5f5f5',
                color: '#616161',
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#2196f3',
                  color: '#ffffff',
                  boxShadow: 'none'
                }
              }}
            >
              Update
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}
