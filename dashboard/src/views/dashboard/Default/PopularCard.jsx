import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function PopularCard({ isLoading, popularProducts = [] }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const defaultProducts = [
    { name: 'Apple iPhone 14 Pro', price: 999.00, profitPercent: 18, isProfit: true },
    { name: 'Samsung Galaxy S23', price: 1199.00, profitPercent: 12, isProfit: true },
    { name: 'Sony WH-1000XM5', price: 399.00, profitPercent: 8, isProfit: false },
    { name: 'MacBook Air M2', price: 1299.00, profitPercent: 24, isProfit: true },
    { name: 'Nike Air Max 270', price: 150.00, profitPercent: 15, isProfit: true }
  ];

  const displayList = popularProducts && popularProducts.length > 0 ? popularProducts : defaultProducts;

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Stack sx={{ gap: gridSpacing }}>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Top Selling Products</Typography>
                <IconButton size="small" sx={{ mt: -0.625 }}>
                  <MoreHorizOutlinedIcon
                    fontSize="small"
                    sx={{ cursor: 'pointer' }}
                    aria-controls="menu-popular-card"
                    aria-haspopup="true"
                    onClick={handleClick}
                  />
                </IconButton>
              </Stack>
              <Menu
                id="menu-popular-card"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                variant="selectedMenu"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleClose}> Today</MenuItem>
                <MenuItem onClick={handleClose}> This Month</MenuItem>
                <MenuItem onClick={handleClose}> This Year </MenuItem>
              </Menu>

              <BajajAreaChartCard />
              <Box>
                {displayList.map((item, index) => (
                  <React.Fragment key={item.id || item.name || index}>
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.85 }
                      }}
                      onClick={() => item.id ? navigate(`/products/details/${item.id}`) : navigate('/products/list')}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        {item.image && (
                          <Avatar
                            src={item.image}
                            alt={item.name}
                            variant="rounded"
                            sx={{ width: 34, height: 34, borderRadius: 1.5 }}
                          />
                        )}
                        <Box>
                          <Typography variant="subtitle1" sx={{ color: 'inherit', fontWeight: 600, fontSize: '0.9rem' }}>
                            {item.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {item.category || 'Electronics'}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" sx={{ alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ color: 'inherit', fontWeight: 600 }}>
                          ${Number(item.price || 0).toFixed(2)}
                        </Typography>
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: '5px',
                            bgcolor: item.isProfit !== false ? 'success.light' : 'orange.light',
                            color: item.isProfit !== false ? 'success.dark' : 'orange.dark',
                            ml: 1.5
                          }}
                        >
                          {item.isProfit !== false ? (
                            <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                          ) : (
                            <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                          )}
                        </Avatar>
                      </Stack>
                    </Stack>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: item.isProfit !== false ? 'success.dark' : 'orange.dark',
                        fontSize: '0.75rem',
                        mt: 0.25,
                        ml: item.image ? 5.75 : 0
                      }}
                    >
                      {item.profitPercent || 10}% {item.isProfit !== false ? 'Profit Margin' : 'Discount Rate'}
                    </Typography>
                    {index < displayList.length - 1 && <Divider sx={{ my: 1.25 }} />}
                  </React.Fragment>
                ))}
              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button
              size="small"
              disableElevation
              onClick={() => navigate('/products/list')}
              sx={{ textTransform: 'none', fontWeight: 600, color: 'primary.main' }}
            >
              View All Products
              <ChevronRightOutlinedIcon sx={{ ml: 0.5 }} />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
}

PopularCard.propTypes = {
  isLoading: PropTypes.bool,
  popularProducts: PropTypes.array
};
