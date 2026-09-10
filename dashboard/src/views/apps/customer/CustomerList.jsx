import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
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
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import BreadcrumbHeader from './BreadcrumbHeader';
import { getCustomers, fetchCustomersFromBackend, deleteCustomer } from './customerData';

// assets
import {
  IconSearch,
  IconPlus,
  IconDownload,
  IconDotsVertical,
  IconEye,
  IconEdit,
  IconTrash
} from '@tabler/icons-react';

// ==============================|| CUSTOMER LIST PAGE ||============================== //

export default function CustomerList() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState(() => getCustomers());
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchCustomersFromBackend().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setCustomers(data);
      }
    });
  }, []);

  // Action Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeCustomer, setActiveCustomer] = useState(null);

  // Delete Dialog State
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Search filtering
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const term = searchTerm.toLowerCase();
      return (
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.phone.toLowerCase().includes(term) ||
        c.country.toLowerCase().includes(term) ||
        c.status.toLowerCase().includes(term)
      );
    });
  }, [customers, searchTerm]);

  // Selection handlers
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredCustomers.map((n) => n.id);
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

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Menu action handlers
  const handleOpenMenu = (event, customer) => {
    setAnchorEl(event.currentTarget);
    setActiveCustomer(customer);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveCustomer(null);
  };

  const handleActionEdit = () => {
    if (activeCustomer) {
      navigate(`/customer/edit/${activeCustomer.id}`);
    }
    handleCloseMenu();
  };

  const handleActionDetails = () => {
    if (activeCustomer) {
      navigate(`/customer/details/${activeCustomer.id}`);
    }
    handleCloseMenu();
  };

  const handleActionDelete = () => {
    if (activeCustomer) {
      setDeleteTarget(activeCustomer);
    }
    handleCloseMenu();
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      const updated = deleteCustomer(deleteTarget.id);
      setCustomers(updated);
      setDeleteTarget(null);
    }
  };

  const handleDownloadCSV = () => {
    const headers = ['ID,Customer Name,Email,Phone,Country,Status\n'];
    const rows = filteredCustomers.map(
      (c) => `"${c.id}","${c.name}","${c.email}","${c.phone}","${c.country}","${c.status}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `customer-list-${Date.now()}.csv`);
    a.click();
  };

  return (
    <Box>
      {/* Top Header & Breadcrumbs */}
      <BreadcrumbHeader title="List" current="List" />

      {/* Main Container Card */}
      <Card
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        {/* Search Bar & Download / Add New Actions */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <OutlinedInput
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            placeholder="Search..."
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

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<IconDownload stroke={1.5} size="1.1rem" />}
              onClick={handleDownloadCSV}
              sx={{
                borderRadius: 1.5,
                borderColor: '#90caf9',
                color: '#1e88e5',
                textTransform: 'none',
                fontWeight: 600,
                px: 2,
                '&:hover': {
                  borderColor: '#1e88e5',
                  bgcolor: 'rgba(33, 150, 243, 0.04)'
                }
              }}
            >
              Download
            </Button>
            <Button
              variant="contained"
              startIcon={<IconPlus stroke={2} size="1.1rem" />}
              onClick={() => navigate('/customer/add')}
              sx={{
                borderRadius: 1.5,
                bgcolor: '#2196f3',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 600,
                px: 2.5,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#1e88e5',
                  boxShadow: 'none'
                }
              }}
            >
              Add New
            </Button>
          </Stack>
        </Stack>

        {/* Customer Table */}
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 750 }} aria-label="customer list table">
            <TableHead>
              <TableRow sx={{ '& th': { borderBottom: '1px solid #f0f0f0', fontWeight: 600, color: '#364152', py: 1.5 } }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < filteredCustomers.length}
                    checked={filteredCustomers.length > 0 && selected.length === filteredCustomers.length}
                    onChange={handleSelectAllClick}
                    size="small"
                  />
                </TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="textSecondary">
                      No customers found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer) => {
                    const isItemSelected = isSelected(customer.id);
                    return (
                      <TableRow
                        hover
                        key={customer.id}
                        selected={isItemSelected}
                        sx={{
                          '& td': { borderBottom: '1px solid #f5f5f5', py: 1.5 },
                          cursor: 'pointer'
                        }}
                      >
                        <TableCell padding="checkbox" onClick={(e) => handleRowClick(e, customer.id)}>
                          <Checkbox color="primary" checked={isItemSelected} size="small" />
                        </TableCell>
                        <TableCell onClick={() => navigate(`/customer/details/${customer.id}`)}>
                          <Stack direction="row" spacing={1.75} alignItems="center">
                            <Avatar
                              src={customer.avatar}
                              alt={customer.name}
                              sx={{ width: 36, height: 36 }}
                            >
                              {customer.name?.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#212121', fontSize: '0.875rem' }}>
                                {customer.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#9e9e9e', fontSize: '0.75rem' }}>
                                {customer.email}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                            {customer.email}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                            {customer.phone}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: '#616161', fontSize: '0.875rem' }}>
                            {customer.country}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {customer.status === 'Active' ? (
                            <Chip
                              label="Active"
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
                              label="Inactive"
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
                            onClick={(e) => handleOpenMenu(e, customer)}
                            sx={{ color: '#9e9e9e' }}
                          >
                            <IconDotsVertical stroke={1.5} size="1.1rem" />
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
            count={filteredCustomers.length}
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

      {/* Row Actions Menu */}
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
        <DialogTitle>Delete Customer</DialogTitle>
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
    </Box>
  );
}
