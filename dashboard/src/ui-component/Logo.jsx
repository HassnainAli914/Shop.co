// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ==============================|| SHOP.CO LOGO ||============================== //

export default function Logo() {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, userSelect: 'none' }}>
      <Typography
        component="span"
        sx={{
          fontFamily: `'Integral CF', 'Poppins', 'Roboto', sans-serif`,
          fontWeight: 900,
          fontSize: '1.45rem',
          letterSpacing: '-0.5px',
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          textTransform: 'uppercase',
          lineHeight: 1
        }}
      >
        SHOP.CO
      </Typography>
      <Box
        component="span"
        sx={{
          bgcolor: 'secondary.main',
          color: 'common.white',
          fontSize: '0.62rem',
          fontWeight: 700,
          px: 0.8,
          py: 0.25,
          borderRadius: '4px',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          lineHeight: 1
        }}
      >
        ADMIN
      </Box>
    </Box>
  );
}

