import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Paper } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledStockImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

StockCard.propTypes = {
  stock: PropTypes.object,
};

export default function StockCard({ stock }) {
  const { name, cover, symbol } = stock;

  return (
    <Card
      
      sx={{
          backdropFilter: 'blur(25px) saturate(200%)',
          WebkitBackdropFilter: 'blur(25px) saturate(200%)',
          backgroundColor: 'rgba(17, 25, 40, 1)',
          border: '1px solid rgba(255, 255, 255, 0.125)',
        '&:hover': {
          backdropFilter: 'blur(2px) saturate(0%)',
          WebkitBackdropFilter: 'blur(2px) saturate(0%)',
          cursor: 'pointer',
          boxShadow: 5,
          
        },
      }}
    >
    <Paper to={`/dashboard/stock/${symbol}`}
      component={RouterLink}>

      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledStockImg alt={name} src={cover} />
      </Box>

      <Stack 
      spacing={2} 
      sx={{ p: 3 }}
      >
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>
      </Stack>
    </Paper>
    </Card>
  );
}
