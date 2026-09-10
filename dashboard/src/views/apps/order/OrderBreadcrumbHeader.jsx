import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// assets
import { IconHome, IconChevronRight } from '@tabler/icons-react';

// ==============================|| ORDER BREADCRUMB HEADER ||============================== //

export default function OrderBreadcrumbHeader({ title, current }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        py: 1.75,
        px: 3,
        mb: 3,
        borderRadius: 2,
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        bgcolor: '#ffffff',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#212121', fontSize: '1.05rem' }}>
          {title}
        </Typography>
        <Breadcrumbs
          separator={<IconChevronRight stroke={1.5} size="0.9rem" color="#9e9e9e" />}
          aria-label="breadcrumb"
        >
          <Link
            component={RouterLink}
            to="/dashboard/default"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#5e35b1',
              '&:hover': { textDecoration: 'none', color: '#4527a0' }
            }}
          >
            <IconHome stroke={2} size="1.15rem" />
          </Link>
          <Link
            component={RouterLink}
            to="/orders/list"
            underline="hover"
            sx={{ fontSize: '0.875rem', color: '#616161' }}
          >
            Order
          </Link>
          <Typography sx={{ fontSize: '0.875rem', color: '#616161' }}>
            {current || title}
          </Typography>
        </Breadcrumbs>
      </Stack>
    </Card>
  );
}

OrderBreadcrumbHeader.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.string
};
