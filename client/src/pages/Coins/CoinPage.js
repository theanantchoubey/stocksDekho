import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';

import axios from 'axios';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import { Grid, Container, Typography, Card, Box, Tabs, Tab } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import EqualizerTwoToneIcon from '@mui/icons-material/EqualizerTwoTone';
import TroubleshootTwoToneIcon from '@mui/icons-material/TroubleshootTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
// components
import { Link, useParams } from 'react-router-dom';

// sections
import { DataRepresentation, DataSummary } from '../../sections/@dashboard/data';
import { Stack } from '@mui/system';
import { fShortenNumber } from 'src/utils/formatNumber';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CoinsPage() {
  const theme = useTheme();
  const [dailyCoinData, setDailyCoinData] = useState([]);
  const [monthlyCoinData, setMonthlyCoinData] = useState([]);
  const [yearlyCoinData, setYearlyCoinData] = useState([]);
  const [coinDetails, setCoinDetails] = useState({});
  const [cryptoCurrencyList, setCryptoCurrencyList] = useState([]);
  const [value, setValue] = useState(0);

  const dailyChartLabels = [];
  const dailyChartCoinPrice = [];
  const monthlyChartLabels = [];
  const monthlyChartCoinPrice = [];
  const yearlyChartLabels = [];
  const yearlyChartCoinPrice = [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fetchCoinData = async (paramsId) => {
    const coinAnalyticsDaily = await axios
      .get(`https://api.coingecko.com/api/v3/coins/${paramsId}/market_chart?vs_currency=usd&days=1&interval=hourly`)
      .then(({ data }) => data);
    const coinAnalyticsMonthly = await axios
      .get(`https://api.coingecko.com/api/v3/coins/${paramsId}/market_chart?vs_currency=usd&days=30&interval=daily`)
      .then(({ data }) => data);
    const coinAnalyticsYearly = await axios
      .get(`https://api.coingecko.com/api/v3/coins/${paramsId}/market_chart?vs_currency=usd&days=365`)
      .then(({ data }) => data);
    const coinData = await axios.get(`https://api.coingecko.com/api/v3/coins/${paramsId}`).then(({ data }) => data);
    const cryptoList = await axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d'
      )
      .then(({ data }) => data);
    setDailyCoinData(coinAnalyticsDaily);
    setMonthlyCoinData(coinAnalyticsMonthly);
    setYearlyCoinData(coinAnalyticsYearly);
    setCoinDetails(coinData);
    setCryptoCurrencyList(cryptoList);
  };
  const { paramsId } = useParams();
  useEffect(() => {
    fetchCoinData(paramsId);
  }, []);
  const { prices: dailyPrices } = dailyCoinData;
  const { prices: monthlyPrices } = monthlyCoinData;
  const { prices: yearlyPrices } = yearlyCoinData;

  if (dailyPrices) {
    for (let i = 0; i < 25; i++) {
      let dailyCoinArray = dailyPrices[i];
      let date = new Date(dailyCoinArray[0]);
      let coinPrice = +dailyCoinArray[1];
      dailyChartLabels.push(date.toLocaleString('en-US'));
      let price = coinPrice.toFixed(3);
      dailyChartCoinPrice.push(price);
    }
  }
  if (monthlyPrices) {
    for (let i = 0; i < 31; i++) {
      let coinArray = monthlyPrices[i];
      let date = new Date(coinArray[0]);
      let coinPrice = +coinArray[1];
      monthlyChartLabels.push(
        date.toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      );
      let price = coinPrice.toFixed(3);
      monthlyChartCoinPrice.push(price);
    }
  }
  if (yearlyPrices) {
    for (let i = 0; i < 366; i++) {
      let yearlyCoinArray = yearlyPrices[i];
      let date = new Date(yearlyCoinArray[0]);
      let coinPrice = +yearlyCoinArray[1];
      yearlyChartLabels.push(
        date.toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      );
      let price = coinPrice.toFixed(3);
      yearlyChartCoinPrice.push(price);
    }
  }
  const { id, symbol, name, description, market_data, market_cap_rank } = coinDetails;
  let currentPrice = '';
  let coinDesc = '';
  let totalSupply, maxSupply, marketCapChange24h, lastUpdated;
  if (market_data) {
    coinDesc = description.en.slice(0, 400);
    currentPrice = market_data.current_price.usd;
    totalSupply = market_data.total_supply;
    lastUpdated = market_data.last_updated.slice(0, 10);
    maxSupply = market_data.max_supply;
    marketCapChange24h = market_data.market_cap_change_24h;
  }
  return (
    <>
      <Helmet>
        <title> {name ? name : 'Loading...'} </title>
      </Helmet>

      {dailyPrices && monthlyPrices && yearlyPrices && coinDetails ? (
        <Container maxWidth="xl">
          <Typography sx={{ px: 2, mb: 3 }} component={Link} color="primary" to={`/dashboard/coins`}>
            <KeyboardDoubleArrowLeftIcon fontSize="30" color="white" /> Back to Crypto Currencies Page
          </Typography>
          <Stack sx={{ px: 2, mb: 3, mt: 1 }}>
            <Typography variant="h4" sx={{ mb: 0 }}>
              {symbol ? symbol : 'Oops! Enough data is not available.'} : {name}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              {id}
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="24 Hr" {...a11yProps(0)} />
                    <Tab label="30 Days" {...a11yProps(1)} />
                    <Tab label="1 Year" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <DataRepresentation
                    sx={{ p: 0 }}
                    title={`$ ${currentPrice}`}
                    subheader={`Last Refreshed ${lastUpdated} . USD`}
                    chartLabels={dailyChartLabels}
                    chartData={[
                      {
                        name: 'Price',
                        type: 'area',
                        fill: 'gradient',
                        data: dailyChartCoinPrice,
                      },
                    ]}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <DataRepresentation
                    sx={{ p: 0 }}
                    title={`$ ${currentPrice}`}
                    subheader={`Last Refreshed ${lastUpdated} . USD`}
                    chartLabels={monthlyChartLabels}
                    chartData={[
                      {
                        name: 'Price',
                        type: 'area',
                        fill: 'gradient',
                        data: monthlyChartCoinPrice,
                      },
                    ]}
                  />
                  {/* Item Two */}
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <DataRepresentation
                    sx={{ p: 0 }}
                    title={`$ ${currentPrice}`}
                    subheader={`Last Refreshed ${lastUpdated} . USD`}
                    chartLabels={yearlyChartLabels}
                    chartData={[
                      {
                        name: 'Price',
                        type: 'area',
                        fill: 'gradient',
                        data: yearlyChartCoinPrice,
                      },
                    ]}
                  />
                </TabPanel>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ py: 1 }}>
                  About
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                  {coinDesc}
                </Typography>

                <Grid container>
                  <Grid item xs={6} sm={6} md={6} sx={{ py: 1 }}>
                    <Typography variant="h6">{fShortenNumber(totalSupply)}</Typography>Total Supply
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} sx={{ py: 1 }}>
                    <Typography variant="h6">{fShortenNumber(maxSupply)}</Typography>Max Supply
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} sx={{ py: 1 }}>
                    <Typography variant="h6">{fShortenNumber(marketCapChange24h)}</Typography>Cap Change 24h
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} sx={{ py: 1 }}>
                    <Typography variant="h6">{market_cap_rank}</Typography>Rank
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {cryptoCurrencyList
              ? cryptoCurrencyList
                  .filter((currency) => currency.market_cap_rank === market_cap_rank)
                  .map((currency, index) => {
                    const { market_cap, total_volume, fully_diluted_valuation, circulating_supply } = currency;
                    return (
                      <Grid container key={index}>
                        <Grid item xs={12} sm={6} md={3}>
                          <DataSummary
                            title="Market Capitalization"
                            total={market_cap}
                            color="error"
                            icon={<TroubleshootTwoToneIcon />}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <DataSummary
                            title="Total Volume"
                            total={total_volume}
                            color="info"
                            icon={<EqualizerTwoToneIcon />}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <DataSummary
                            title="Fully Diluted Valuation"
                            total={fully_diluted_valuation}
                            color="warning"
                            icon={<TableChartTwoToneIcon />}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <DataSummary
                            title="Circulating supply"
                            total={circulating_supply}
                            color="error"
                            icon={<CurrencyExchangeTwoToneIcon />}
                          />
                        </Grid>
                      </Grid>
                    );
                  })
              : ''}
          </Grid>
        </Container>
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
