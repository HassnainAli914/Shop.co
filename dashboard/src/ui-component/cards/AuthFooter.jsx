// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter() {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
      <Typography variant="subtitle2" component={Link} href="http://localhost:5173" target="_blank" underline="hover">
        SHOP.CO Store
      </Typography>
      <Typography variant="subtitle2">
        &copy; {new Date().getFullYear()} SHOP.CO Admin
      </Typography>
    </Stack>
  );
}

