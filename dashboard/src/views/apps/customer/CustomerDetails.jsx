import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import BreadcrumbHeader from './BreadcrumbHeader';
import { getCustomerById } from './customerData';

// assets
import {
  IconPhone,
  IconMail,
  IconCalendar,
  IconEdit,
  IconChevronDown
} from '@tabler/icons-react';

// ==============================|| CUSTOMER DETAILS PAGE ||============================== //

export default function CustomerDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (id) {
      const data = getCustomerById(id);
      setCustomer(data);
    } else {
      setCustomer(getCustomerById('1'));
    }
  }, [id]);

  if (!customer) {
    return null;
  }

  const readOnlyFieldSx = {
    borderRadius: 1.5,
    bgcolor: '#fafafa',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e0e2e6'
    },
    '& .MuiOutlinedInput-input': {
      color: '#9e9e9e',
      fontSize: '0.875rem'
    }
  };

  const labelSx = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#364152',
    mb: 0.75,
    display: 'block'
  };

  return (
    <Box>
      {/* Top Header & Breadcrumbs */}
      <BreadcrumbHeader title="Details" current="Details" />

      {/* Unified Main Card Container */}
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden'
        }}
      >
        {/* Side-by-Side 2-Column Layout */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
            width: '100%'
          }}
        >
          {/* ===================== LEFT SIDEBAR (Profile & Addresses) ===================== */}
          <Box
            sx={{
              width: { xs: '100%', md: 320, lg: 340 },
              minWidth: { md: 320, lg: 340 },
              maxWidth: { md: 340 },
              p: { xs: 2.5, md: 3 },
              borderRight: { md: '1px solid #f0f0f0' },
              borderBottom: { xs: '1px solid #f0f0f0', md: 'none' },
              flexShrink: 0
            }}
          >
            {/* Top User Avatar & Stats */}
            <Box sx={{ textAlign: 'center', pt: 1 }}>
              <Box sx={{ display: 'inline-block', position: 'relative', mb: 1.5 }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        bgcolor: '#00c853',
                        border: '2px solid #ffffff'
                      }}
                    />
                  }
                >
                  <Avatar
                    src={customer.avatar}
                    alt={customer.name}
                    sx={{
                      width: 86,
                      height: 86,
                      border: '3px solid #2196f3',
                      p: 0.25,
                      bgcolor: '#2196f3'
                    }}
                  >
                    {customer.name?.charAt(0)}
                  </Avatar>
                </Badge>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 600, color: '#212121', mb: 2.5 }}>
                {customer.name}
              </Typography>

              {/* Total Order & Order Values Banner */}
              <Box
                sx={{
                  bgcolor: '#edf7fd',
                  borderRadius: 2,
                  py: 1.75,
                  px: 2,
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#616161', display: 'block', mb: 0.5, fontSize: '0.75rem' }}>
                    Total Order
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#212121' }}>
                    {customer.totalOrder}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ borderColor: '#bbdefb' }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: '#616161', display: 'block', mb: 0.5, fontSize: '0.75rem' }}>
                    Order Values
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#212121' }}>
                    {customer.orderValues}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3, borderColor: '#f0f0f0' }} />

            {/* Contact Details List */}
            <Stack spacing={2.25}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    bgcolor: '#e3f2fd',
                    color: '#1e88e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconPhone stroke={1.5} size="1.2rem" />
                </Box>
                <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                  {customer.phone}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    bgcolor: '#ede7f6',
                    color: '#5e35b1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconMail stroke={1.5} size="1.2rem" />
                </Box>
                <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                  {customer.email}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    bgcolor: '#e8f5e9',
                    color: '#2e7d32',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconCalendar stroke={1.5} size="1.2rem" />
                </Box>
                <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                  {customer.joinedDate}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 3, borderColor: '#f0f0f0' }} />

            {/* Shipping Address Box */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: '1px solid #f0f0f0',
                bgcolor: '#ffffff',
                mb: 2.5
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#212121', fontSize: '0.9rem' }}>
                  Shipping Address
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => navigate(`/customer/edit/${customer.id}`)}
                  sx={{
                    border: '1px solid #90caf9',
                    borderRadius: 1.5,
                    color: '#1e88e5',
                    p: 0.6
                  }}
                >
                  <IconEdit stroke={1.5} size="1rem" />
                </IconButton>
              </Stack>
              <Typography variant="body2" sx={{ color: '#757575', lineHeight: 1.7, fontSize: '0.825rem' }}>
                {customer.address},<br />
                {customer.city},<br />
                {customer.country} -<br />
                {customer.pinCode}
              </Typography>
            </Box>

            {/* Billing Address Box */}
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: '1px solid #f0f0f0',
                bgcolor: '#ffffff'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#212121', fontSize: '0.9rem' }}>
                  Billing Address
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => navigate(`/customer/edit/${customer.id}`)}
                  sx={{
                    border: '1px solid #90caf9',
                    borderRadius: 1.5,
                    color: '#1e88e5',
                    p: 0.6
                  }}
                >
                  <IconEdit stroke={1.5} size="1rem" />
                </IconButton>
              </Stack>
              <Typography variant="body2" sx={{ color: '#757575', lineHeight: 1.7, fontSize: '0.825rem' }}>
                {customer.address},<br />
                {customer.city},<br />
                {customer.country} -<br />
                {customer.pinCode}
              </Typography>
            </Box>
          </Box>

          {/* ===================== RIGHT MAIN CONTENT (All Input Sections) ===================== */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 2.5, md: 3.5 },
              minWidth: 0
            }}
          >
            {/* Section 1: Basic Information */}
            <Box sx={{ pb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121', fontSize: '0.95rem' }}>
                Basic Information
              </Typography>

              {/* Row 1: First Name & Last Name */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2.5,
                  mb: 2.5
                }}
              >
                <Box>
                  <FormLabel sx={labelSx}>First Name</FormLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    readOnly
                    value={customer.firstName || customer.name?.split(' ')[0] || ''}
                    sx={readOnlyFieldSx}
                  />
                </Box>
                <Box>
                  <FormLabel sx={labelSx}>Last Name</FormLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    readOnly
                    value={customer.lastName || customer.name?.split(' ').slice(1).join(' ') || ''}
                    sx={readOnlyFieldSx}
                  />
                </Box>
              </Box>

              {/* Row 2: User Name & Email */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2.5,
                  mb: 2.5
                }}
              >
                <Box>
                  <FormLabel sx={labelSx}>User Name</FormLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    readOnly
                    value={customer.userName || customer.email?.split('@')[0] || ''}
                    sx={readOnlyFieldSx}
                  />
                </Box>
                <Box>
                  <FormLabel sx={labelSx}>Email</FormLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    readOnly
                    value={customer.email || ''}
                    sx={readOnlyFieldSx}
                  />
                </Box>
              </Box>

              {/* Row 3: Contact */}
              <Box>
                <FormLabel sx={labelSx}>
                  Contact <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  readOnly
                  value={customer.phone || ''}
                  startAdornment={
                    <InputAdornment position="start">
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mr: 1 }}>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#616161' }}>
                          {customer.countryCode || 'US'}
                        </Typography>
                        <IconChevronDown size="0.9rem" color="#757575" />
                      </Stack>
                      <Divider orientation="vertical" flexItem sx={{ mr: 1.5, height: 20 }} />
                    </InputAdornment>
                  }
                  sx={readOnlyFieldSx}
                />
              </Box>
            </Box>

            <Divider sx={{ borderColor: '#f0f0f0' }} />

            {/* Section 2: Address Information */}
            <Box sx={{ py: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121', fontSize: '0.95rem' }}>
                Address Information
              </Typography>

              {/* Row 1: Address */}
              <Box sx={{ mb: 2.5 }}>
                <FormLabel sx={labelSx}>Address</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  readOnly
                  value={customer.address || ''}
                  sx={readOnlyFieldSx}
                />
              </Box>

              {/* Row 2: Pin Code, City, Country */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                  gap: 2.5
                }}
              >
                <Box>
                  <FormLabel sx={labelSx}>Pin Code</FormLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    readOnly
                    value={customer.pinCode || ''}
                    sx={readOnlyFieldSx}
                  />
                </Box>
                <Box>
                  <FormLabel sx={labelSx}>City</FormLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    readOnly
                    value={customer.city || ''}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconChevronDown size="1.1rem" color="#9e9e9e" />
                      </InputAdornment>
                    }
                    sx={readOnlyFieldSx}
                  />
                </Box>
                <Box>
                  <FormLabel sx={labelSx}>Country</FormLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    readOnly
                    value={customer.country || ''}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconChevronDown size="1.1rem" color="#9e9e9e" />
                      </InputAdornment>
                    }
                    sx={readOnlyFieldSx}
                  />
                </Box>
              </Box>
            </Box>

            <Divider sx={{ borderColor: '#f0f0f0' }} />

            {/* Section 3: Additional Notes */}
            <Box sx={{ pt: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121', fontSize: '0.95rem' }}>
                Additional Notes
              </Typography>

              <FormLabel sx={labelSx}>Note</FormLabel>
              <OutlinedInput
                fullWidth
                multiline
                rows={4}
                readOnly
                value={customer.notes || ''}
                sx={readOnlyFieldSx}
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
