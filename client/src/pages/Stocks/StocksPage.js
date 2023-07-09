import { Helmet } from 'react-helmet-async';
import React, { useState } from 'react';
import { Card, Stack, TextField, Typography, Grid, Avatar, Container, InputAdornment, Paper } from '@mui/material';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import LaunchIcon from '@mui/icons-material/Launch';
// @mui
// components
import { StockList } from '../../sections/@dashboard/stocks';
// mock
import STOCKS from '../../_mock/stocks';

const styles = {
  hover: {
    '&:hover': {
      backgroundColor: 'rgb(7, 177, 77, 0.42)',
    },
  },
};
const StocksPage = () => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchStockSuggestions = async (keyword) => {
    const list = await axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${process.env.REACT_APP_MY_API}`
      )
      .then(({ data }) => data);
    if (list && list.bestMatches) {
      if (list.bestMatches.length !== 0) {
        setSuggestions(list.bestMatches);
      } else {
        setSuggestions([{ '1. symbol': 'No Matching Results!', '2. name': '' }]);
      }
    }
  };
  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    if (keyword) {
      fetchStockSuggestions(keyword);
    } else {
      setSuggestions([]);
    }
  };
  return (
    <>
      <Helmet>
        <title> Explore Top Shares </title>
      </Helmet>
      <Stack xs={2} md={2} lg={1} sx={{ ml: 2 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Search Shares
        </Typography>
        <Card xs={2} md={2} lg={1} sx={{ p: 2 }} >
          <TextField
            fullWidth
            onChange={handleSearchChange}
            sx={{ bgcolor: '#000', borderRadius: 2, mb: 2 }}
            id="outlined-basic"
            label="Search Stocks"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {suggestions.map((stock, index) => {
            const { '1. symbol': symbol, '2. name': name } = stock;
            return (
              <Paper key={index}>
                {name && symbol ? (
                  <Stack
                    to={`/dashboard/stock/${symbol}`}
                    component={RouterLink}
                    sx={{
                      ...styles,
                      textDecoration: 'none',
                      color: '#fff',
                      '& :hover': {
                        color: 'lightBlue',
                      },
                    }}
                  >
                    <Grid container>
                      <Grid xs={8} md={8} lg={8} item>
                        <Typography sx={{ p: 1 }} variant="body2">
                          {name}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} md={3} lg={3}>
                        <Typography sx={{ p: 1 }} variant="overline">
                          {symbol}
                        </Typography>
                      </Grid>
                      <Grid item xs={1} md={1} lg={1}>
                        <LaunchIcon sx={{ float: 'right' }} />
                      </Grid>
                    </Grid>
                  </Stack>
                ) : (
                  'Not Found!'
                )}
              </Paper>
            );
          })}
        </Card>
      </Stack>

      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Explore Top Companies Shares
        </Typography>
        <StockList stocks={STOCKS} />
      </Container>
    </>
  );
};

export default StocksPage;
