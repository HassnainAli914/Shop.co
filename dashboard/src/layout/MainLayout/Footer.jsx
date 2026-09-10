import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 3, mt: 'auto' }}>
      <Typography variant="caption">
        &copy; {new Date().getFullYear()} All rights reserved{' '}
        <Typography component={Link} href="http://localhost:5173" underline="hover" target="_blank" sx={{ color: 'secondary.main', fontWeight: 600 }}>
          SHOP.CO
        </Typography>
      </Typography>
      <Stack direction="row" sx={{ gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Link
          component="a"
          href="http://localhost:5173"
          underline="hover"
          target="_blank"
          variant="caption"
          color="text.primary"
          sx={{ fontWeight: 500 }}
        >
          Customer Store
        </Link>
        <Link
          component={RouterLink}
          to="/products/list"
          underline="hover"
          variant="caption"
          color="text.primary"
          sx={{ fontWeight: 500 }}
        >
          Products
        </Link>
        <Link
          component={RouterLink}
          to="/orders/list"
          underline="hover"
          variant="caption"
          color="text.primary"
          sx={{ fontWeight: 500 }}
        >
          Orders
        </Link>
      </Stack>
    </Stack>
  );
}

