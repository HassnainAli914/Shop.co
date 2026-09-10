import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import EcommerceBreadcrumbHeader from './EcommerceBreadcrumbHeader';
import { addProduct } from './productData';

// assets
import { IconPhoto, IconUpload, IconCurrencyDollar } from '@tabler/icons-react';

// ==============================|| ADD PRODUCT PAGE ||============================== //

export default function ProductAdd() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    brand: '',
    sku: '',
    salePrice: '',
    offerPrice: '',
    stock: 20,
    status: 'In Stock',
    description: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = true;
    if (!formData.category.trim()) errs.category = true;
    if (!formData.salePrice.trim()) errs.salePrice = true;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newProd = {
      name: formData.name,
      category: formData.category,
      brand: formData.brand || 'Generic',
      sku: formData.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      salePrice: formData.salePrice.startsWith('$') ? formData.salePrice : `$${formData.salePrice}`,
      offerPrice: formData.offerPrice
        ? formData.offerPrice.startsWith('$')
          ? formData.offerPrice
          : `$${formData.offerPrice}`
        : formData.salePrice.startsWith('$')
        ? formData.salePrice
        : `$${formData.salePrice}`,
      stock: Number(formData.stock) || 0,
      status: formData.status,
      description: formData.description,
      image:
        formData.image ||
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80'
    };

    addProduct(newProd);
    setSuccess(true);
    setTimeout(() => {
      navigate('/products/list');
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
      <EcommerceBreadcrumbHeader title="Add Product" current="Add Product" />

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
          New Product
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Product created successfully! Redirecting to product list...
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Section 1: Product Photo */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2.5}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            sx={{ pb: 3, borderBottom: '1px solid #f0f0f0' }}
          >
            <Stack direction="row" spacing={2.5} alignItems="center">
              {formData.image ? (
                <Avatar
                  src={formData.image}
                  variant="rounded"
                  sx={{ width: 72, height: 72, borderRadius: 2 }}
                />
              ) : (
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 2,
                    bgcolor: '#f4f6f8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9e9e9e'
                  }}
                >
                  <IconPhoto stroke={1.5} size="2rem" />
                </Box>
              )}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                  Product Thumbnail
                </Typography>
                <Typography variant="caption" sx={{ color: '#757575' }}>
                  Upload high resolution product image (optional)
                </Typography>
              </Box>
            </Stack>

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
                px: 2.5,
                '&:hover': {
                  borderColor: '#1e88e5',
                  bgcolor: 'rgba(33, 150, 243, 0.04)'
                }
              }}
            >
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Stack>

          {/* Section 2: General Information */}
          <Box sx={{ py: 3, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121' }}>
              General Information
            </Typography>

            <Box sx={{ mb: 2.5 }}>
              <FormLabel sx={labelSx}>
                Product Name <span style={{ color: '#f44336' }}>*</span>
              </FormLabel>
              <OutlinedInput
                fullWidth
                size="small"
                placeholder="e.g. Apple MacBook Pro with Retina"
                value={formData.name}
                onChange={handleChange('name')}
                error={Boolean(errors.name)}
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
                  Category <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.category}
                    onChange={handleChange('category')}
                    sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Computers & Laptops">Computers & Laptops</MenuItem>
                    <MenuItem value="Fashion & Accessories">Fashion & Accessories</MenuItem>
                    <MenuItem value="Audio">Audio</MenuItem>
                    <MenuItem value="Wearables">Wearables</MenuItem>
                    <MenuItem value="Fashion & Footwear">Fashion & Footwear</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormLabel sx={labelSx}>Brand</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  placeholder="e.g. Apple, Sony, Nike"
                  value={formData.brand}
                  onChange={handleChange('brand')}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>

              <Box>
                <FormLabel sx={labelSx}>SKU / Product Code</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  placeholder="e.g. APP-MBP-14"
                  value={formData.sku}
                  onChange={handleChange('sku')}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>
            </Box>
          </Box>

          {/* Section 3: Pricing & Inventory */}
          <Box sx={{ py: 3, borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121' }}>
              Pricing & Inventory
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' },
                gap: 2.5
              }}
            >
              <Box>
                <FormLabel sx={labelSx}>
                  Sale Price <span style={{ color: '#f44336' }}>*</span>
                </FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  placeholder="15.99"
                  value={formData.salePrice}
                  onChange={handleChange('salePrice')}
                  error={Boolean(errors.salePrice)}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>

              <Box>
                <FormLabel sx={labelSx}>Offer Price</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  placeholder="12.99"
                  value={formData.offerPrice}
                  onChange={handleChange('offerPrice')}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>

              <Box>
                <FormLabel sx={labelSx}>Stock Quantity</FormLabel>
                <OutlinedInput
                  fullWidth
                  size="small"
                  type="number"
                  placeholder="20"
                  value={formData.stock}
                  onChange={handleChange('stock')}
                  sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                />
              </Box>

              <Box>
                <FormLabel sx={labelSx}>Status</FormLabel>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.status}
                    onChange={handleChange('status')}
                    sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
                  >
                    <MenuItem value="In Stock">In Stock</MenuItem>
                    <MenuItem value="Out Of Stock">Out Of Stock</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Section 4: Description */}
          <Box sx={{ py: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2.5, color: '#212121' }}>
              Product Description
            </Typography>

            <FormLabel sx={labelSx}>Description</FormLabel>
            <OutlinedInput
              fullWidth
              multiline
              rows={4}
              placeholder="Enter comprehensive product features and specifications..."
              value={formData.description}
              onChange={handleChange('description')}
              sx={{ borderRadius: 1.5, bgcolor: '#ffffff' }}
            />
          </Box>

          {/* Footer Actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center" sx={{ pt: 2 }}>
            <Button
              variant="text"
              onClick={() => navigate('/products/list')}
              sx={{ color: '#f44336', textTransform: 'none', fontWeight: 600 }}
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
                px: 3,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#1e88e5',
                  boxShadow: 'none'
                }
              }}
            >
              Save Product
            </Button>
          </Stack>
        </form>
      </Card>
    </Box>
  );
}
