import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';

import { useState, useEffect } from 'react';
import { fShortenNumber } from 'src/utils/formatNumber';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
// components
import Label from '../../components/label';
import Scrollbar from '../../components/scrollbar';
// sections
import { CoinListHead, CoinListToolBar } from '../../sections/@dashboard/coin';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Coin Name', alignRight: false },
  { id: 'price', label: 'Price (in  USD)', alignRight: false },
  { id: 'priceChange', label: 'Price Change (in %)', alignRight: false },
  { id: 'isVerified', label: 'Market Capitalization', alignRight: false },
  { id: 'status', label: 'Total Volume', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_coin) => _coin.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function CryptoPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('key');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [cryptoCurrencyList, setCryptoCurrencyList] = useState([]);
  const fetchCryptoData = async () => {
    const cryptoList = await axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
      )
      .then(({ data }) => data);
    setCryptoCurrencyList(cryptoList);
  };
  useEffect(() => {
    fetchCryptoData();
  }, []);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = COINLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cryptoCurrencyList.length) : 0;

  const filteredCoins = applySortFilter(cryptoCurrencyList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredCoins.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Top 100 CryptoCurrencies </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Top 100 CryptoCurrencies
          </Typography>
        </Stack>

        <Card>
          <CoinListToolBar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer component='div' sx={{ minWidth: 800 }}>
              <Table component='div'>
                <CoinListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={cryptoCurrencyList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody component='div'>
                  <>
                    {filteredCoins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cryptoData) => {
                      const {
                        id,
                        name,
                        market_cap_rank,
                        symbol,
                        current_price,
                        image,
                        price_change_percentage_24h,
                        market_cap,
                        total_volume,
                      } = cryptoData;
                      const selectedCoin = selected.indexOf(name) !== -1;

                      const currentPrice = current_price.toFixed(2);
                      const priceChange = Math.round(price_change_percentage_24h * 100) / 100;
                      return (
                        <TableRow
                          to={`/dashboard/coins/${id}`}
                          component={RouterLink}
                          sx={{ textDecoration: 'none' }}
                          hover
                          key={market_cap_rank}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedCoin}
                        >
                          <TableCell component="span" align="right">
                            {market_cap_rank}
                          </TableCell>

                          <TableCell component="span" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={symbol} src={image} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell component="span" align="left">
                            $ {currentPrice}
                          </TableCell>

                          <TableCell component="span" align="left">
                            <Label color={(priceChange < 0 && 'error') || 'success'}>
                              {priceChange < 0 ? `${priceChange}%` : `+ ${priceChange}%`}
                            </Label>
                          </TableCell>

                          <TableCell component="span" align="left">
                            $ {fShortenNumber(market_cap)}
                          </TableCell>
                          <TableCell component="span" align="left">
                            {fShortenNumber(total_volume)} Coins
                          </TableCell>

                          <TableCell component="span" align="right">
                            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                              <LaunchIcon sx={{ float: 'right' }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </>

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={cryptoCurrencyList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
