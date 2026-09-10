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
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

// project imports
import OrderBreadcrumbHeader from './OrderBreadcrumbHeader';
import { getOrderById, updateOrder } from './orderData';

// assets
import { IconTrash, IconPlus, IconMinus } from '@tabler/icons-react';

// ==============================|| EDIT ORDER PAGE ||============================== //

export default function OrderEdit() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  
  // Customer details
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Address
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('Credit / Debit Card');
  const [cardNumber, setCardNumber] = useState('************');
  const [expDate, setExpDate] = useState('12/29');
  const [cvv, setCvv] = useState('***');

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const targetId = id || '790955';
    const data = getOrderById(targetId);
    if (data) {
      setOrder(data);
      setItems(data.items || []);
      setFirstName(data.customerName || '');
      setUserName(data.userName || 'joseph_william');
      setEmail(data.email || '');
      setPhone(data.phone?.replace('+1 ', '') || '5623598742');
      setAddress(data.address || '123 Main Street');
      setPinCode(data.pinCode || '100011');
      setCity(data.city || 'New York');
      setCountry(data.country || 'United States');
      setCardNumber(data.cardNumber || '************');
      setExpDate(data.expDate || '12/29');
      setCvv(data.cvv || '***');
    }
  }, [id]);

  if (!order) {
    return null;
  }

  const handleQuantityChange = (productId, delta) => {
    setItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId) {
            const newQty = Math.max(1, item.quantity + delta);
            return {
              ...item,
              quantity: newQty,
              total: newQty * item.unitPrice
            };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const calculatedTotal = items.reduce((sum, item) => sum + item.total, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      customerName: firstName,
      userName: userName,
      email: email,
      phone: `+1 ${phone}`,
      address: address,
      pinCode: pinCode,
      city: city,
      country: country,
      paymentType: paymentMethod.includes('Card') ? 'Card' : paymentMethod,
      cardNumber: cardNumber,
      expDate: expDate,
      cvv: cvv,
      items: items,
      subtotal: calculatedTotal,
      total: calculatedTotal + (order.shippingFee || 20) + (order.tax || 105),
      quantity: items.reduce((sum, item) => sum + item.quantity, 0)
    };

    updateOrder(id || '790955', updated);
    setSuccess(true);
    setTimeout(() => {
      navigate(`/orders/details/${id || '790955'}`);
    }, 800);
  };

  const labelSx = {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#364152',
    mb: 1,
    display: 'block'
  };

  const sectionTitleSx = {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#121926',
    mb: 2.5
  };

  return (
    <Box>
      {/* Top Header & Breadcrumbs in White Container Card */}
      <OrderBreadcrumbHeader title="Edit" current="Edit" />

      {/* Main Single Container Card */}
      <Card
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 2,
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          bgcolor: '#ffffff',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Order updated successfully! Redirecting...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* ===================== 1. SELECT PRODUCT SECTION ===================== */}
          <Box sx={{ mb: 4 }}>
            <Typography sx={sectionTitleSx}>Select Product</Typography>

            <TableContainer sx={{ border: '1px solid #edf2f7', borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#475569', py: 1.75 }}>Product</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#475569', py: 1.75 }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#475569', py: 1.75 }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#475569', py: 1.75 }}>Total</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, color: '#475569', py: 1.75 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ py: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            src={item.image}
                            alt={item.name}
                            variant="rounded"
                            sx={{ width: 44, height: 44, borderRadius: 1.5, border: '1px solid #f0f0f0' }}
                          />
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                              {item.sku}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell sx={{ py: 2 }}>
                        {/* Quantity Counter */}
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1px solid #e2e8f0',
                            borderRadius: 1.5,
                            p: 0.5,
                            bgcolor: '#ffffff'
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            sx={{ width: 26, height: 26, color: '#64748b' }}
                          >
                            <IconMinus size="0.9rem" />
                          </IconButton>
                          <Typography
                            sx={{
                              px: 1.5,
                              minWidth: 28,
                              textAlign: 'center',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              color: '#1e293b'
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            sx={{ width: 26, height: 26, color: '#64748b' }}
                          >
                            <IconPlus size="0.9rem" />
                          </IconButton>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ py: 2, color: '#475569', fontWeight: 500 }}>
                        ${item.unitPrice?.toFixed(2)}
                      </TableCell>

                      <TableCell sx={{ py: 2, color: '#1e293b', fontWeight: 600 }}>
                        ${item.total?.toFixed(2)}
                      </TableCell>

                      <TableCell align="center" sx={{ py: 2 }}>
                        <IconButton
                          onClick={() => handleRemoveItem(item.id)}
                          sx={{
                            color: '#ef4444',
                            bgcolor: '#fef2f2',
                            borderRadius: 1.5,
                            width: 34,
                            height: 34,
                            '&:hover': { bgcolor: '#fee2e2' }
                          }}
                        >
                          <IconTrash size="1.1rem" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Total Row */}
            <Box
              sx={{
                mt: 1.5,
                p: 2,
                bgcolor: '#f8fafc',
                borderRadius: 1.5,
                border: '1px solid #edf2f7',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#2196f3' }}>
                Total : ${calculatedTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3.5, borderColor: '#edf2f7' }} />

          {/* ===================== 2. CUSTOMER DETAILS SECTION ===================== */}
          <Box sx={{ mb: 4 }}>
            <Typography sx={sectionTitleSx}>Customer Details</Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' },
                gap: 2.5
              }}
            >
              <Box>
                <FormLabel sx={labelSx}>First Name</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>
              <Box>
                <FormLabel sx={labelSx}>User Name</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="User Name"
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>
              <Box>
                <FormLabel sx={labelSx}>Email</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>
              <Box>
                <FormLabel sx={labelSx}>Phone Number</FormLabel>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Select
                    size="small"
                    defaultValue="US"
                    sx={{ width: 80, borderRadius: 1.5, bgcolor: '#ffffff' }}
                  >
                    <MenuItem value="US">US</MenuItem>
                    <MenuItem value="CA">CA</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    <MenuItem value="IN">IN</MenuItem>
                  </Select>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3.5, borderColor: '#edf2f7' }} />

          {/* ===================== 3. ADDRESS INFORMATION SECTION ===================== */}
          <Box sx={{ mb: 4 }}>
            <Typography sx={sectionTitleSx}>Address Information</Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' },
                gap: 2.5
              }}
            >
              <Box>
                <FormLabel sx={labelSx}>Address</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>
              <Box>
                <FormLabel sx={labelSx}>Pin Code</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="Pin Code"
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>
              <Box>
                <FormLabel sx={labelSx}>City</FormLabel>
                <Select
                  fullWidth
                  size="small"
                  value={city || 'Select City'}
                  onChange={(e) => setCity(e.target.value)}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                >
                  <MenuItem value="Select City" disabled>Select City</MenuItem>
                  <MenuItem value="New York">New York</MenuItem>
                  <MenuItem value="Chicago">Chicago</MenuItem>
                  <MenuItem value="Portland">Portland</MenuItem>
                  <MenuItem value="Toronto">Toronto</MenuItem>
                  <MenuItem value="London">London</MenuItem>
                </Select>
              </Box>
              <Box>
                <FormLabel sx={labelSx}>Country</FormLabel>
                <Select
                  fullWidth
                  size="small"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                >
                  <MenuItem value="United States">United States</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  <MenuItem value="India">India</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3.5, borderColor: '#edf2f7' }} />

          {/* ===================== 4. PAYMENT SECTION ===================== */}
          <Box sx={{ mb: 4 }}>
            <Typography sx={sectionTitleSx}>Payment</Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' },
                gap: 2.5
              }}
            >
              <Box>
                <FormLabel sx={labelSx}>Select Payment Method</FormLabel>
                <Select
                  fullWidth
                  size="small"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                >
                  <MenuItem value="Credit / Debit Card">Credit / Debit Card</MenuItem>
                  <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
                  <MenuItem value="UPI / Net Banking">UPI / Net Banking</MenuItem>
                  <MenuItem value="PayPal">PayPal</MenuItem>
                </Select>
              </Box>
              <Box>
                <FormLabel sx={labelSx}>Credit Card Number</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Credit Card Number"
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>
              <Box>
                <FormLabel sx={labelSx}>Expiration Date</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  placeholder="MM/YY"
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>
              <Box>
                <FormLabel sx={labelSx}>CVV</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3.5, borderColor: '#edf2f7' }} />

          {/* ===================== 5. FOOTER ACTIONS ===================== */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
            <Button
              variant="text"
              onClick={() => navigate('/orders/list')}
              sx={{
                color: '#f44336',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.08)' }
              }}
            >
              Discard
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#2196f3',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                px: 3.5,
                py: 1,
                borderRadius: 1.5,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#1e88e5',
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
