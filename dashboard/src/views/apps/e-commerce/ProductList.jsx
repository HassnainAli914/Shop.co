import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// project imports
import EcommerceBreadcrumbHeader from './EcommerceBreadcrumbHeader';
import { getProducts, fetchProductsFromBackend, deleteProduct } from './productData';

// assets
import {
  IconSearch,
  IconCopy,
  IconPrinter,
  IconFilter,
  IconPlus,
  IconDots,
  IconEye,
  IconEdit,
  IconTrash
} from '@tabler/icons-react';

// ==============================|| PRODUCT LIST PAGE ||============================== //

export default function ProductList() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [products, setProducts] = useState(() => getProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchProductsFromBackend().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
    });
  }, []);

  // Actions menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);

  // Filter menu state
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Filtering
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term) ||
        product.brand?.toLowerCase().includes(term) ||
        product.salePrice.toLowerCase().includes(term);

      const matchesStatus = statusFilter === 'All' || product.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [products, searchTerm, statusFilter]);

  // Selection handlers
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredProducts.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Menu action handlers
  const handleOpenMenu = (event, product) => {
    setAnchorEl(event.currentTarget);
    setActiveProduct(product);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveProduct(null);
  };

  const handleActionDetails = () => {
    if (activeProduct) {
      navigate(`/products/details/${activeProduct.id}`);
    }
    handleCloseMenu();
  };

  const handleActionEdit = () => {
    if (activeProduct) {
      navigate(`/products/edit/${activeProduct.id}`);
    }
    handleCloseMenu();
  };

  const handleActionDelete = () => {
    if (activeProduct) {
      setDeleteTarget(activeProduct);
    }
    handleCloseMenu();
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      const updated = deleteProduct(deleteTarget.id);
      setProducts(updated);
      setDeleteTarget(null);
      setToastMessage('Product deleted successfully');
    }
  };

  // Top toolbar actions
  const handleCopy = () => {
    const textData = filteredProducts
      .map((p) => `${p.name} | ${p.created} | ${p.salePrice} | ${p.offerPrice} | ${p.status}`)
      .join('\n');
    navigator.clipboard.writeText(textData);
    setToastMessage('Product data copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
      {/* Top Header & Breadcrumbs */}
      <EcommerceBreadcrumbHeader title="Product List" current="Product List" />

      {/* Main Container Card */}
      <Card
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        {/* Search Bar & Toolbar Icons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          {/* Search Input */}
          <OutlinedInput
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            placeholder="Search Product"
            startAdornment={
              <InputAdornment position="start">
                <IconSearch stroke={1.5} size="1.1rem" color={theme.palette.text.secondary} />
              </InputAdornment>
            }
            sx={{
              width: { xs: '100%', sm: 260 },
              borderRadius: 1.5,
              bgcolor: '#ffffff',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e2e6'
              }
            }}
          />

          {/* Action Toolbars */}
          <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'flex-end', sm: 'flex-start' }}>
            <Tooltip title="Copy Table Data">
              <IconButton
                onClick={handleCopy}
                size="small"
                sx={{
                  border: '1px solid #e0e2e6',
                  borderRadius: 1.5,
                  p: 0.8,
                  color: '#616161'
                }}
              >
                <IconCopy stroke={1.5} size="1.2rem" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Print Table">
              <IconButton
                onClick={handlePrint}
                size="small"
                sx={{
                  border: '1px solid #e0e2e6',
                  borderRadius: 1.5,
                  p: 0.8,
                  color: '#616161'
                }}
              >
                <IconPrinter stroke={1.5} size="1.2rem" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Filter by Status">
              <IconButton
                onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                size="small"
                sx={{
                  border: '1px solid #e0e2e6',
                  borderRadius: 1.5,
                  p: 0.8,
                  color: statusFilter !== 'All' ? '#2196f3' : '#616161'
                }}
              >
                <IconFilter stroke={1.5} size="1.2rem" />
              </IconButton>
            </Tooltip>

            {/* Circular Add Button */}
            <Tooltip title="Add New Product">
              <IconButton
                onClick={() => navigate('/products/add')}
                sx={{
                  bgcolor: '#2196f3',
                  color: '#ffffff',
                  width: 36,
                  height: 36,
                  boxShadow: '0 2px 8px rgba(33, 150, 243, 0.4)',
                  '&:hover': {
                    bgcolor: '#1e88e5'
                  }
                }}
              >
                <IconPlus stroke={2.5} size="1.2rem" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Product Table */}
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 800 }} aria-label="product list table">
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    borderBottom: '1px solid #f0f0f0',
                    fontWeight: 600,
                    color: '#364152',
                    py: 1.5,
                    fontSize: '0.875rem'
                  }
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < filteredProducts.length}
                    checked={filteredProducts.length > 0 && selected.length === filteredProducts.length}
                    onChange={handleSelectAllClick}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ width: 40 }}>#</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Sale Price</TableCell>
                <TableCell>Offer Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No products found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product, idx) => {
                    const isItemSelected = isSelected(product.id);
                    return (
                      <TableRow
                        hover
                        key={product.id}
                        selected={isItemSelected}
                        sx={{
                          '& td': { borderBottom: '1px solid #f5f5f5', py: 1.5 },
                          cursor: 'pointer'
                        }}
                      >
                        <TableCell padding="checkbox" onClick={(e) => handleRowClick(e, product.id)}>
                          <Checkbox color="primary" checked={isItemSelected} size="small" />
                        </TableCell>
                        <TableCell onClick={() => navigate(`/products/details/${product.id}`)}>
                          <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.875rem' }}>
                            {page * rowsPerPage + idx + 1}
                          </Typography>
                        </TableCell>
                        <TableCell onClick={() => navigate(`/products/details/${product.id}`)}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar
                              src={product.image}
                              alt={product.name}
                              variant="rounded"
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: 2,
                                border: '1px solid #f0f0f0',
                                objectFit: 'cover'
                              }}
                            />
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                                color: '#212121',
                                fontSize: '0.875rem',
                                maxWidth: { xs: 200, sm: 300 },
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {product.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                            {product.created}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem', fontWeight: 500 }}>
                            {product.salePrice}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem', fontWeight: 500 }}>
                            {product.offerPrice}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {product.status === 'In Stock' ? (
                            <Chip
                              label="In Stock"
                              size="small"
                              sx={{
                                bgcolor: '#e8f8ee',
                                color: '#10b981',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: '24px',
                                borderRadius: '12px'
                              }}
                            />
                          ) : (
                            <Chip
                              label="Out Of Stock"
                              size="small"
                              sx={{
                                bgcolor: '#fee8e8',
                                color: '#ef4444',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: '24px',
                                borderRadius: '12px'
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={(e) => handleOpenMenu(e, product)}
                            sx={{ color: '#9e9e9e' }}
                          >
                            <IconDots stroke={1.5} size="1.2rem" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: 'none',
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontSize: '0.875rem',
                color: '#616161'
              }
            }}
          />
        </Box>
      </Card>

      {/* Row Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
            borderRadius: 2,
            minWidth: 140
          }
        }}
      >
        <MenuItem onClick={handleActionDetails}>
          <ListItemIcon>
            <IconEye stroke={1.5} size="1.1rem" />
          </ListItemIcon>
          <ListItemText primary="Details" />
        </MenuItem>
        <MenuItem onClick={handleActionEdit}>
          <ListItemIcon>
            <IconEdit stroke={1.5} size="1.1rem" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={handleActionDelete} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <IconTrash stroke={1.5} size="1.1rem" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      {/* Status Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setStatusFilter('All');
            setFilterAnchorEl(null);
          }}
          selected={statusFilter === 'All'}
        >
          All Statuses
        </MenuItem>
        <MenuItem
          onClick={() => {
            setStatusFilter('In Stock');
            setFilterAnchorEl(null);
          }}
          selected={statusFilter === 'In Stock'}
        >
          In Stock
        </MenuItem>
        <MenuItem
          onClick={() => {
            setStatusFilter('Out Of Stock');
            setFilterAnchorEl(null);
          }}
          selected={statusFilter === 'Out Of Stock'}
        >
          Out Of Stock
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteTarget(null)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar notification */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={3000}
        onClose={() => setToastMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setToastMessage('')}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
