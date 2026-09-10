import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TableSortLabel from '@mui/material/TableSortLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// project imports
import OrderBreadcrumbHeader from './OrderBreadcrumbHeader';
import { getOrders, fetchOrdersFromBackend, updateOrder, deleteOrder } from './orderData';

// assets
import {
  IconSearch,
  IconPlus,
  IconDownload,
  IconDotsVertical,
  IconEye,
  IconEdit,
  IconTrash,
  IconChevronDown
} from '@tabler/icons-react';

// ==============================|| ORDER LIST PAGE ||============================== //

export default function OrderList() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [orders, setOrders] = useState(() => getOrders());
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortAsc, setSortAsc] = useState(true);

  // Actions menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Toast message state
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchOrdersFromBackend().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setOrders(data);
      }
    });
  }, []);

  // Filtering & Sorting
  const filteredOrders = useMemo(() => {
    let result = orders.filter((order) => {
      const term = searchTerm.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.branch.toLowerCase().includes(term) ||
        order.paymentType.toLowerCase().includes(term) ||
        order.status.toLowerCase().includes(term)
      );
    });

    result.sort((a, b) => {
      const numA = parseInt(a.orderNumber.replace('#', ''), 10) || 0;
      const numB = parseInt(b.orderNumber.replace('#', ''), 10) || 0;
      return sortAsc ? numA - numB : numB - numA;
    });

    return result;
  }, [orders, searchTerm, sortAsc]);

  // Selection handlers
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredOrders.map((n) => n.id);
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
  const handleOpenMenu = (event, order) => {
    setAnchorEl(event.currentTarget);
    setActiveOrder(order);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveOrder(null);
  };

  const handleActionDetails = () => {
    if (activeOrder) {
      navigate(`/orders/details/${activeOrder.id}`);
    }
    handleCloseMenu();
  };

  const handleActionEdit = () => {
    if (activeOrder) {
      navigate(`/orders/edit/${activeOrder.id}`);
    }
    handleCloseMenu();
  };

  const handleActionDelete = () => {
    if (activeOrder) {
      setDeleteTarget(activeOrder);
    }
    handleCloseMenu();
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      const updated = deleteOrder(deleteTarget.id);
      setOrders(updated);
      setDeleteTarget(null);
      setToastMessage('Order deleted successfully');
    }
  };

  const handleDownloadCSV = () => {
    const headers = ['ID,Customer Name,Branch,Payment Type,Quantity,Order Date,Status\n'];
    const rows = filteredOrders.map(
      (o) =>
        `"${o.orderNumber}","${o.customerName}","${o.branch}","${o.paymentType}","${o.quantity}","${o.orderDate}","${o.status}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `orders-list-${Date.now()}.csv`);
    a.click();
  };

  // Status Change Handler connected directly to Database
  const handleStatusChange = async (orderId, newStatus) => {
    // Immediate UI update
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    // Sync to Supabase Database
    try {
      await updateOrder(orderId, { status: newStatus });
      setToastMessage(`Order status changed to ${newStatus}`);
    } catch (err) {
      setToastMessage('Failed to update status in database');
    }
  };

  // Status Style Helper
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'complete':
      case 'delivered':
        return {
          bg: '#e8f8ee',
          color: '#10b981',
          border: '#bbf7d0'
        };
      case 'processing':
      case 'shipped':
        return {
          bg: '#e3f2fd',
          color: '#1e88e5',
          border: '#bfdbfe'
        };
      case 'hold':
        return {
          bg: '#e1f5fe',
          color: '#0288d1',
          border: '#bae6fd'
        };
      case 'cancel':
      case 'cancelled':
        return {
          bg: '#fee8e8',
          color: '#ef4444',
          border: '#fecaca'
        };
      default:
        return {
          bg: '#fff9e6',
          color: '#f59e0b',
          border: '#fde68a'
        };
    }
  };

  return (
    <Box>
      {/* Top Header & Breadcrumbs in White Container Card */}
      <OrderBreadcrumbHeader title="Order List" current="List" />

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
        {/* Search Bar & Actions Toolbar */}
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
            placeholder="Search"
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

          {/* Action Buttons */}
          <Stack direction="row" spacing={1.5} alignItems="center" justifyContent={{ xs: 'flex-end', sm: 'flex-start' }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<IconDownload size="1.1rem" />}
              onClick={handleDownloadCSV}
              sx={{
                borderRadius: 1.5,
                borderColor: '#e0e2e6',
                color: '#616161',
                textTransform: 'none',
                fontWeight: 600,
                px: 2,
                py: 0.75
              }}
            >
              CSV
            </Button>

            <Button
              variant="contained"
              size="small"
              startIcon={<IconPlus size="1.1rem" />}
              onClick={() => navigate('/orders/create')}
              sx={{
                borderRadius: 1.5,
                bgcolor: '#2196f3',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                px: 2,
                py: 0.75,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#1e88e5',
                  boxShadow: 'none'
                }
              }}
            >
              Add Order
            </Button>
          </Stack>
        </Stack>

        {/* Orders Table */}
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 850 }} aria-label="orders table">
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    borderBottom: '1px solid #f0f0f0',
                    fontWeight: 600,
                    color: '#364152',
                    py: 1.75,
                    fontSize: '0.875rem'
                  }
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < filteredOrders.length}
                    checked={filteredOrders.length > 0 && selected.length === filteredOrders.length}
                    onChange={handleSelectAllClick}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={sortAsc ? 'asc' : 'desc'}
                    onClick={() => setSortAsc(!sortAsc)}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Payment Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell sx={{ minWidth: 150 }}>Status (Change)</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No orders found matching your search.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => {
                    const isItemSelected = isSelected(order.id);
                    const statusCfg = getStatusConfig(order.status);

                    return (
                      <TableRow
                        hover
                        key={order.id}
                        selected={isItemSelected}
                        sx={{
                          '& td': { borderBottom: '1px solid #f5f5f5', py: 1.5 },
                          cursor: 'pointer'
                        }}
                      >
                        <TableCell padding="checkbox" onClick={(e) => handleRowClick(e, order.id)}>
                          <Checkbox color="primary" checked={isItemSelected} size="small" />
                        </TableCell>
                        <TableCell onClick={() => navigate(`/orders/details/${order.id}`)}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121', fontSize: '0.875rem' }}>
                            {order.orderNumber}
                          </Typography>
                        </TableCell>
                        <TableCell onClick={() => navigate(`/orders/details/${order.id}`)}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#212121', fontSize: '0.875rem' }}>
                            {order.customerName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                            {order.branch}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                            {order.paymentType}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                            {order.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                            {order.orderDate}
                          </Typography>
                        </TableCell>

                        {/* Interactive Status Dropdown Selector */}
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Select
                            size="small"
                            value={order.status || 'Pending'}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            IconComponent={IconChevronDown}
                            sx={{
                              height: '28px',
                              borderRadius: '14px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              bgcolor: statusCfg.bg,
                              color: statusCfg.color,
                              border: `1px solid ${statusCfg.border}`,
                              '& .MuiSelect-select': {
                                py: '3px',
                                pl: '10px',
                                pr: '24px !important',
                                display: 'flex',
                                alignItems: 'center'
                              },
                              '& .MuiSelect-icon': {
                                right: '6px',
                                width: '16px',
                                height: '16px',
                                color: statusCfg.color
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                              }
                            }}
                          >
                            <MenuItem value="Pending" sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#f59e0b' }}>
                              Pending
                            </MenuItem>
                            <MenuItem value="Processing" sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e88e5' }}>
                              Processing
                            </MenuItem>
                            <MenuItem value="Complete" sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#10b981' }}>
                              Complete (Delivered)
                            </MenuItem>
                            <MenuItem value="Hold" sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#0288d1' }}>
                              Hold
                            </MenuItem>
                            <MenuItem value="Cancel" sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#ef4444' }}>
                              Cancel
                            </MenuItem>
                          </Select>
                        </TableCell>

                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={(e) => handleOpenMenu(e, order)}
                            sx={{ color: '#9e9e9e' }}
                          >
                            <IconDotsVertical stroke={1.5} size="1.2rem" />
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
            count={filteredOrders.length}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Delete Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete order <strong>{deleteTarget?.orderNumber}</strong>?
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

      {/* Toast Notification */}
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
