import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import StockCard from './StockCard';

// ----------------------------------------------------------------------

StockList.propTypes = {
  stocks: PropTypes.array.isRequired,
};

export default function StockList({ stocks, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {stocks.map((stock) => (
        <Grid key={stock.id} item xs={12} sm={6} md={3}>
          <StockCard stock={stock} />
        </Grid>
      ))}
    </Grid>
  );
}
