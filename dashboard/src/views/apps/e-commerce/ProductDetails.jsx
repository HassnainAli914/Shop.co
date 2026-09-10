import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// project imports
import EcommerceBreadcrumbHeader from './EcommerceBreadcrumbHeader';
import { getProductById } from './productData';

// assets
import {
  IconArrowLeft,
  IconEdit,
  IconShoppingCart,
  IconTruckDelivery,
  IconShieldCheck,
  IconRotate2,
  IconPlus,
  IconMinus
} from '@tabler/icons-react';

// ==============================|| PRODUCT DETAILS PAGE ||============================== //

export default function ProductDetails() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (id) {
      const data = getProductById(id);
      setProduct(data);
      setSelectedImage(data.gallery?.[0] || data.image);
    } else {
      const defaultProd = getProductById('1');
      setProduct(defaultProd);
      setSelectedImage(defaultProd.gallery?.[0] || defaultProd.image);
    }
  }, [id]);

  if (!product) {
    return null;
  }

  const galleryList = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <Box>
      {/* Top Header & Breadcrumbs */}
      <EcommerceBreadcrumbHeader title="Product Details" current="Product Details" />

      {/* Main Container Card */}
      <Card
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: 2,
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          mb: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 4 }
          }}
        >
          {/* Left Column: Image Showcase */}
          <Box
            sx={{
              width: { xs: '100%', md: 420, lg: 460 },
              flexShrink: 0
            }}
          >
            {/* Main Featured Image */}
            <Box
              sx={{
                width: '100%',
                height: { xs: 280, sm: 360 },
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: '#f8fafc',
                border: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                position: 'relative'
              }}
            >
              <Box
                component="img"
                src={selectedImage || product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <Chip
                label={product.status}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  bgcolor: product.status === 'In Stock' ? '#e8f8ee' : '#fee8e8',
                  color: product.status === 'In Stock' ? '#10b981' : '#ef4444',
                  fontWeight: 600
                }}
              />
            </Box>

            {/* Thumbnail Gallery Strip */}
            <Stack direction="row" spacing={1.5}>
              {galleryList.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 1.5,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedImage === img ? '2px solid #2196f3' : '1px solid #e0e2e6',
                    p: 0.25,
                    bgcolor: '#ffffff',
                    transition: 'all 0.2s'
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={`thumbnail-${index}`}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Right Column: Product Info & Actions */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack spacing={2.5}>
              {/* Category & Brand */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ color: '#2196f3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {product.brand} &bull; {product.category}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<IconEdit stroke={1.5} size="1rem" />}
                  onClick={() => navigate(`/products/edit/${product.id}`)}
                  sx={{
                    borderRadius: 1.5,
                    borderColor: '#90caf9',
                    color: '#1e88e5',
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  Edit Product
                </Button>
              </Stack>

              {/* Title */}
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#212121', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                {product.name}
              </Typography>

              {/* Ratings */}
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Rating value={product.rating || 4.5} precision={0.1} readOnly size="small" />
                <Typography variant="body2" sx={{ color: '#616161', fontWeight: 600 }}>
                  {product.rating || 4.5}
                </Typography>
                <Typography variant="caption" sx={{ color: '#9e9e9e' }}>
                  ({product.reviewsCount || 100} customer reviews)
                </Typography>
              </Stack>

              {/* Pricing Section */}
              <Box
                sx={{
                  bgcolor: '#f8fafc',
                  p: 2,
                  borderRadius: 2,
                  border: '1px solid #f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Typography variant="h3" sx={{ color: '#2196f3', fontWeight: 700 }}>
                  {product.offerPrice}
                </Typography>
                {product.salePrice !== product.offerPrice && (
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#9e9e9e',
                      textDecoration: 'line-through',
                      fontWeight: 500
                    }}
                  >
                    {product.salePrice}
                  </Typography>
                )}
                {product.salePrice !== product.offerPrice && (
                  <Chip
                    label="Special Offer"
                    size="small"
                    sx={{ bgcolor: '#fff3e0', color: '#f57c00', fontWeight: 600, fontSize: '0.75rem' }}
                  />
                )}
              </Box>

              {/* Description Snippet */}
              <Typography variant="body2" sx={{ color: '#616161', lineHeight: 1.7 }}>
                {product.description}
              </Typography>

              <Divider sx={{ borderColor: '#f0f0f0' }} />

              {/* Specifications Table */}
              <Table size="small" sx={{ '& td': { border: 'none', py: 0.75, px: 0 } }}>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: 140, color: '#757575', fontWeight: 500 }}>SKU Code:</TableCell>
                    <TableCell sx={{ color: '#212121', fontWeight: 600 }}>{product.sku}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#757575', fontWeight: 500 }}>Stock Availability:</TableCell>
                    <TableCell sx={{ color: product.status === 'In Stock' ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                      {product.status === 'In Stock' ? `${product.stock || 25} units available` : 'Currently unavailable'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ color: '#757575', fontWeight: 500 }}>Added On:</TableCell>
                    <TableCell sx={{ color: '#212121' }}>{product.created}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Divider sx={{ borderColor: '#f0f0f0' }} />

              {/* Quantity & Add to Cart Controls */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
                <Stack direction="row" alignItems="center" sx={{ border: '1px solid #e0e2e6', borderRadius: 1.5, width: 'fit-content' }}>
                  <IconButton
                    size="small"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <IconMinus size="1rem" />
                  </IconButton>
                  <Typography sx={{ px: 2, fontWeight: 600, minWidth: 32, textAlign: 'center' }}>
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <IconPlus size="1rem" />
                  </IconButton>
                </Stack>

                <Button
                  variant="contained"
                  startIcon={<IconShoppingCart size="1.1rem" />}
                  sx={{
                    bgcolor: '#2196f3',
                    color: '#ffffff',
                    fontWeight: 600,
                    textTransform: 'none',
                    px: 3,
                    borderRadius: 1.5,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#1e88e5',
                      boxShadow: 'none'
                    }
                  }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate('/products/list')}
                  sx={{
                    color: '#616161',
                    borderColor: '#e0e2e6',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 1.5
                  }}
                >
                  Back to List
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Card>

      {/* Tabs for Detailed Description, Features & Shipping */}
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          p: 3
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: '#f0f0f0', mb: 2.5 }}>
          <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)}>
            <Tab label="Full Description" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Shipping & Delivery" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label="Warranty & Support" sx={{ textTransform: 'none', fontWeight: 600 }} />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#616161', mb: 2 }}>
              {product.description}
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8, color: '#757575' }}>
              Engineered with premium quality standards, ensuring maximum performance and reliability across various operational environments.
            </Typography>
          </Box>
        )}

        {tabValue === 1 && (
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <IconTruckDelivery size="1.2rem" color="#2196f3" />
              <Typography variant="body2" sx={{ color: '#616161' }}>
                Standard shipping: 3 - 5 business days across US, Canada, and UK.
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <IconRotate2 size="1.2rem" color="#10b981" />
              <Typography variant="body2" sx={{ color: '#616161' }}>
                Hassle-free 30-day money-back guarantee with free return labels.
              </Typography>
            </Stack>
          </Stack>
        )}

        {tabValue === 2 && (
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <IconShieldCheck size="1.2rem" color="#5e35b1" />
              <Typography variant="body2" sx={{ color: '#616161' }}>
                Includes 1-Year Official Manufacturer Warranty covering all hardware defects and technical maintenance.
              </Typography>
            </Stack>
          </Stack>
        )}
      </Card>
    </Box>
  );
}
