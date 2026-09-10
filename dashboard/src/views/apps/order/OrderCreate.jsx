import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';

// project imports
import OrderBreadcrumbHeader from './OrderBreadcrumbHeader';
import { addOrder, mockProductsForOrder } from './orderData';

// assets
import {
  IconSearch,
  IconPlus,
  IconMinus,
  IconTrash,
  IconCreditCard,
  IconCheck,
  IconShoppingBag
} from '@tabler/icons-react';

// ==============================|| CREATE ORDER PAGE ||============================== //

export default function OrderCreate() {
  const theme = useTheme();
  const navigate = useNavigate();

  // Selected Products State
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');

  // Modal dialog state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState('');
  const [modalSelected, setModalSelected] = useState([]);
  const [modalPage, setModalPage] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    userName: '',
    email: '',
    countryCode: 'US',
    phone: '',
    address: '',
    pinCode: '',
    city: '',
    country: '',
    paymentMethod: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Filter products for modal
  const filteredModalProducts = mockProductsForOrder.filter((p) =>
    p.name.toLowerCase().includes(modalSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(modalSearch.toLowerCase())
  );

  const handleOpenModal = () => {
    setModalSelected(selectedProducts.map((p) => p.id));
    setModalOpen(true);
  };

  const handleToggleProductInModal = (pId) => {
    if (modalSelected.includes(pId)) {
      setModalSelected((prev) => prev.filter((id) => id !== pId));
    } else {
      setModalSelected((prev) => [...prev, pId]);
    }
  };

  const handleDoneModal = () => {
    const newlySelected = mockProductsForOrder
      .filter((p) => modalSelected.includes(p.id))
      .map((p) => {
        const existing = selectedProducts.find((sp) => sp.id === p.id);
        return existing || { ...p, quantity: 1 };
      });
    setSelectedProducts(newlySelected);
    setModalOpen(false);
  };

  const handleQuantityChange = (pId, newQty) => {
    setSelectedProducts((prev) =>
      prev.map((item) => (item.id === pId ? { ...item, quantity: Math.max(1, newQty) } : item))
    );
  };

  const handleRemoveProduct = (pId) => {
    setSelectedProducts((prev) => prev.filter((item) => item.id !== pId));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = true;
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

    const total = calculateTotal();
    const formattedItems = selectedProducts.map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      unitPrice: p.price,
      quantity: p.quantity,
      total: p.price * p.quantity,
      image: p.image
    }));

    const newOrderData = {
      customerName: formData.firstName,
      userName: formData.userName,
      email: formData.email,
      phone: `${formData.countryCode === 'US' ? '+1 ' : ''}${formData.phone}`,
      branch: formData.country === 'United States' ? 'USA' : formData.country,
      paymentType: formData.paymentMethod || 'Card',
      quantity: selectedProducts.reduce((sum, item) => sum + item.quantity, 0) || 1,
      status: 'Pending',
      subtotal: total,
      shippingFee: 20.00,
      tax: total * 0.1,
      total: total + 20.00 + total * 0.1,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      pinCode: formData.pinCode,
      state: 'NY',
      items: formattedItems
    };

    addOrder(newOrderData);
    setSuccess(true);
    setTimeout(() => {
      navigate('/orders/list');
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
      {/* Top Header & Breadcrumbs in White Container Card */}
      <OrderBreadcrumbHeader title="Create" current="Create" />

      {/* Main Container Card */}
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
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Order created successfully! Redirecting to orders list...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Section 1: Select Product */}
          <Box sx={{ pb: 3, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121' }}>
              Select Product
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2.5 }}
            >
              <OutlinedInput
                size="small"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search Product"
                startAdornment={
                  <InputAdornment position="start">
                    <IconSearch stroke={1.5} size="1.1rem" color={theme.palette.text.secondary} />
                  </InputAdornment>
                }
                sx={{
                  width: { xs: '100%', sm: 240 },
                  borderRadius: 1.5,
                  bgcolor: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#e0e2e6'
                  }
                }}
              />

              <Button
                variant="contained"
                startIcon={<IconPlus size="1.1rem" />}
                onClick={handleOpenModal}
                sx={{
                  bgcolor: '#2196f3',
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 1.5,
                  px: 2.5,
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#1e88e5',
                    boxShadow: 'none'
                  }
                }}
              >
                Add Product
              </Button>
            </Stack>

            {/* Product Table / Empty State */}
            <TableContainer sx={{ border: '1px solid #f0f0f0', borderRadius: 2 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#ffffff' }}>
                  <TableRow sx={{ '& th': { borderBottom: '1px solid #f0f0f0', py: 1.5, fontWeight: 600, color: '#424242' } }}>
                    <TableCell sx={{ pl: 3 }}>Product</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          {/* Illustrated Empty Bag */}
                          <Box
                            sx={{
                              width: 100,
                              height: 100,
                              mb: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: '#e1f5fe',
                              borderRadius: 3,
                              color: '#0288d1'
                            }}
                          >
                            <IconShoppingBag stroke={1.5} size="3.5rem" />
                          </Box>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: '#212121', mb: 0.5 }}>
                            No products selected!
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#757575', maxWidth: 400 }}>
                            No products selected. Use the search bar to find and add items, then continue.
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    selectedProducts.map((p) => (
                      <TableRow key={p.id} sx={{ '& td': { borderBottom: '1px solid #f5f5f5', py: 1.75 } }}>
                        <TableCell sx={{ pl: 3 }}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Avatar
                              src={p.image}
                              alt={p.name}
                              variant="rounded"
                              sx={{ width: 44, height: 44, borderRadius: 1.5 }}
                            />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                              {p.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161' }}>
                            {p.sku}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontWeight: 600 }}>
                            ${p.price.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              border: '1px solid #e0e2e6',
                              borderRadius: 1.5,
                              width: 'fit-content',
                              mx: 'auto'
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(p.id, p.quantity - 1)}
                              disabled={p.quantity <= 1}
                              sx={{ p: 0.5 }}
                            >
                              <IconMinus size="0.9rem" />
                            </IconButton>
                            <Typography sx={{ px: 1.5, fontWeight: 600, fontSize: '0.875rem' }}>
                              {p.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleQuantityChange(p.id, p.quantity + 1)}
                              sx={{ p: 0.5 }}
                            >
                              <IconPlus size="0.9rem" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveProduct(p.id)}
                            sx={{ color: '#f44336' }}
                          >
                            <IconTrash size="1.1rem" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Total Bar */}
            <Box
              sx={{
                bgcolor: '#f8fafc',
                p: 2,
                borderRadius: 2,
                border: '1px solid #f0f0f0',
                mt: 2,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <Typography variant="subtitle1" sx={{ color: '#616161', mr: 1, fontWeight: 600 }}>
                Total :
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#212121' }}>
                ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>

          {/* Section 2: Customer Details */}
          <Box sx={{ py: 3, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121' }}>
              Customer Details
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
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  error={Boolean(errors.firstName)}
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
                  placeholder="Enter user name"
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
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={Boolean(errors.email)}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>

              <Box>
                <FormLabel sx={labelSx}>
                  Phone Number <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  placeholder="1231x xxxxx"
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
                placeholder="Enter your address"
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
                  placeholder="123456"
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
                    displayEmpty
                    sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                  >
                    <MenuItem value="" disabled>
                      <Typography color="textSecondary" sx={{ fontSize: '0.875rem' }}>Select City</Typography>
                    </MenuItem>
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                    <MenuItem value="Chicago">Chicago</MenuItem>
                    <MenuItem value="Toronto">Toronto</MenuItem>
                    <MenuItem value="London">London</MenuItem>
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
                    displayEmpty
                    sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                  >
                    <MenuItem value="" disabled>
                      <Typography color="textSecondary" sx={{ fontSize: '0.875rem' }}>Select Country</Typography>
                    </MenuItem>
                    <MenuItem value="United States">United States</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Section 4: Payment */}
          <Box sx={{ py: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121' }}>
              Payment
            </Typography>

            <FormControl fullWidth size="small">
              <Select
                value={formData.paymentMethod}
                onChange={handleChange('paymentMethod')}
                displayEmpty
                startAdornment={
                  <InputAdornment position="start">
                    <IconCreditCard size="1.2rem" color="#9e9e9e" />
                  </InputAdornment>
                }
                sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
              >
                <MenuItem value="" disabled>
                  <Typography color="textSecondary" sx={{ fontSize: '0.875rem' }}>Select Payment Method</Typography>
                </MenuItem>
                <MenuItem value="Card">Credit / Debit Card</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="COD">Cash on Delivery (COD)</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Footer Actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" sx={{ pt: 2 }}>
            <Button
              variant="text"
              onClick={() => navigate('/orders/list')}
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
              Add
            </Button>
          </Stack>
        </form>
      </Card>

      {/* ===================== ALL PRODUCTS MODAL DIALOG (Image 3) ===================== */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2.5,
            p: 1.5
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#212121' }}>
              All Products
            </Typography>
            <Typography variant="caption" sx={{ color: '#757575' }}>
              Add products to this order.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<IconCheck size="1rem" />}
            onClick={handleDoneModal}
            sx={{
              bgcolor: '#2196f3',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 1.5,
              px: 2,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#1e88e5' }
            }}
          >
            Done
          </Button>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          {/* Modal Search Input */}
          <OutlinedInput
            fullWidth
            size="small"
            value={modalSearch}
            onChange={(e) => setModalSearch(e.target.value)}
            placeholder="Search product"
            startAdornment={
              <InputAdornment position="start">
                <IconSearch stroke={1.5} size="1.1rem" color={theme.palette.text.secondary} />
              </InputAdornment>
            }
            sx={{ mb: 2.5, borderRadius: 1.5 }}
          />

          {/* Products List */}
          <Stack spacing={1}>
            {filteredModalProducts.map((p) => {
              const isChecked = modalSelected.includes(p.id);
              return (
                <Stack
                  key={p.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => handleToggleProductInModal(p.id)}
                  sx={{
                    p: 1.25,
                    borderRadius: 1.5,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#f8fafc' }
                  }}
                >
                  <Stack direction="row" spacing={1.75} alignItems="center">
                    <Checkbox checked={isChecked} color="primary" size="small" />
                    <Avatar
                      src={p.image}
                      alt={p.name}
                      variant="rounded"
                      sx={{ width: 42, height: 42, borderRadius: 1.5 }}
                    />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121' }}>
                      {p.name}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: '#757575', fontWeight: 500 }}>
                    {p.sku}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>

          {/* Modal Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={8}
              page={modalPage}
              onChange={(e, val) => setModalPage(val)}
              color="primary"
              shape="rounded"
              size="small"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
