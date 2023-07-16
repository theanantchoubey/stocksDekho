import { Helmet } from 'react-helmet-async';
// @mui
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Container, Typography, Card, Box, Tabs, Tab } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import QueryStatsTwoToneIcon from '@mui/icons-material/QueryStatsTwoTone';
// sections
import { DataRepresentation, DataSummary } from '../../sections/@dashboard/data';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

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
export default function DashboardAppPage() {
  const theme = useTheme();
  const [dailyStockData, setDailyStockData] = useState({});
  const [monthlyStockData, setMonthlyStockData] = useState({});
  const [companyDetails, setCompanyDetails] = useState({});
  const [value, setValue] = useState(0);

  const monthlyChartLabels = [];
  const monthlyChartHigh = [];
  const monthlyChartLow = [];
  const monthlyChartClose = [];
  const dailyChartLabels = [];
  const dailyChartHigh = [];
  const dailyChartLow = [];
  const dailyChartClose = [];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fetchStockData = async (paramsSymbol) => {
    const monthlyStockAnalytics = await axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${paramsSymbol}&apikey=${process.env.REACT_APP_MY_API}`)
      .then(({ data }) => data);
    const dailyStockAnalytics = await axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${paramsSymbol}&outputsize=full&apikey=${process.env.REACT_APP_MY_API}`
      )
      .then(({ data }) => data);
    const stockCompanyData = await axios
      .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${paramsSymbol}&apikey=${process.env.REACT_APP_MY_API}`)
      .then(({ data }) => data);
      console.log(dailyStockAnalytics);
      console.log(monthlyStockAnalytics);
      console.log(stockCompanyData);
    setDailyStockData(dailyStockAnalytics);
    setMonthlyStockData(monthlyStockAnalytics);
    setCompanyDetails(stockCompanyData);
  };

  const { paramsSymbol } = useParams();
  useEffect(() => {
    fetchStockData(paramsSymbol);
  }, []);
  const { 'Monthly Time Series': monthlyTimeSeries } = monthlyStockData;
  const { 'Time Series (Daily)': dailyTimeSeries } = dailyStockData;

  let currentPrice = '';
  if (dailyTimeSeries) {
    let i = 0;
    Object.keys(dailyTimeSeries).forEach((key) => {
      i++;
      if (i < 2) {
        currentPrice = +dailyTimeSeries[key]['4. close'];
        Math.round(currentPrice, 2).toString();
      }
      if (i < 24) {
        let result = key.replace(/-/g, '/');
        let high = dailyTimeSeries[key]['2. high'];
        let low = dailyTimeSeries[key]['3. low'];
        let close = dailyTimeSeries[key]['4. close'];

        dailyChartHigh.push(+high);
        dailyChartLow.push(+low);
        dailyChartClose.push(+close);
        dailyChartLabels.push(result);
      }
    });
  }
  if (monthlyTimeSeries) {
    let i = 0;
    Object.keys(monthlyTimeSeries).forEach((key) => {
      i++;
      if (i < 2) {
        currentPrice = +monthlyTimeSeries[key]['4. close'];
        Math.round(currentPrice, 2).toString();
      }
      if (i < 13) {
        let result = key.replace(/-/g, '/');
        let high = monthlyTimeSeries[key]['2. high'];
        let low = monthlyTimeSeries[key]['3. low'];
        let close = monthlyTimeSeries[key]['4. close'];

        monthlyChartHigh.push(+high);
        monthlyChartLow.push(+low);
        monthlyChartClose.push(+close);
        monthlyChartLabels.push(result);
      }
    });
  }

  const { 'Meta Data': monthlyMetaData } = monthlyStockData;
  const { 'Meta Data': dailyMetaData } = dailyStockData;
  const {
    Symbol: symbol,
    Name: coName,
    Description: coDescLong,
    Sector: sector,
    '52WeekHigh': weekHigh,
    '52WeekLow': weekLow,
    Industry: coIndustry,
    Address: coAddress,
    Exchange: primaryExchange,
    Currency: currency,
    PERatio: peRatio,
    DividendPerShare: dividendPS,
    MarketCapitalization: marketCap,
    RevenueTTM: revenueTTM,
    GrossProfitTTM: grossProfitTTM,
    SharesOutstanding: sharesOutstanding,
  } = companyDetails;
  if (coDescLong) {
    var coDescSliced = coDescLong.slice(0, 300);
  }
  return (
    <>
      <Helmet>
        <title> {coName ? coName : 'Loading...'} </title>
      </Helmet>

      {dailyMetaData && monthlyMetaData && companyDetails ? (
        <Container maxWidth="xl">
          <Typography sx={{ px: 2, mb: 3 }} component={Link} color="primary" to={`/dashboard/stocks`}>
            <KeyboardDoubleArrowLeftIcon fontSize="30" color="white" /> Back to Stocks Page
          </Typography>
          <Stack sx={{ px: 2, mb: 3, mt: 1 }}>
            <Typography variant="h4" sx={{ mb: 0 }}>
              {symbol ? symbol : 'Oops! Enough Data is Not Available'} : {coName}
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              {sector}
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="30 Days" {...a11yProps(0)} />
                    <Tab label="1 Year" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <DataRepresentation
                    title={`$ ${currentPrice}`}
                    subheader={`Last Refreshed ${
                      dailyMetaData ? dailyMetaData['3. Last Refreshed'] : ''
                    } . ${currency}`}
                    chartLabels={dailyChartLabels}
                    chartData={[
                      {
                        name: 'High',
                        type: 'column',
                        fill: 'solid',
                        data: dailyChartHigh,
                      },
                      {
                        name: 'Low',
                        type: 'area',
                        fill: 'gradient',
                        data: dailyChartLow,
                      },
                      {
                        name: 'Price',
                        type: 'line',
                        fill: 'solid',
                        data: dailyChartClose,
                      },
                    ]}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  {' '}
                  <DataRepresentation
                    title={`$ ${currentPrice}`}
                    subheader={`Last Refreshed ${
                      monthlyMetaData ? monthlyMetaData['3. Last Refreshed'] : ''
                    } . ${currency}`}
                    chartLabels={monthlyChartLabels}
                    chartData={[
                      {
                        name: 'High',
                        type: 'column',
                        fill: 'solid',
                        data: monthlyChartHigh,
                      },
                      {
                        name: 'Low',
                        type: 'area',
                        fill: 'gradient',
                        data: monthlyChartLow,
                      },
                      {
                        name: 'Price',
                        type: 'line',
                        fill: 'solid',
                        data: monthlyChartClose,
                      },
                    ]}
                  />{' '}
                </TabPanel>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card
                sx={{
                  p: 2,

                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  backgroundColor: 'rgba(17, 25, 40, 0.75)',
                  // border: '1px solid rgba(255, 255, 255, 0.125)',
                }}
              >
                <Typography variant="h5" sx={{ py: 1 }}>
                  About
                </Typography>

                <Typography variant="body1" sx={{ mb: 1 }}>
                  {coDescSliced}
                </Typography>
                <Typography variant="body2" sx={{}}>
                  <b>Primary Exchange:</b> {primaryExchange}
                </Typography>
                <Typography variant="body2" sx={{}}>
                  <b>Industry:</b> {coIndustry}
                </Typography>
                <Typography variant="body2" sx={{}}>
                  <b>Address:</b> {coAddress}
                </Typography>
                <Grid container>
                  <Grid item={true} xs={6} sm={6} md={6} sx={{ py: 1 }}>
                    <Typography variant="h6">{weekHigh}</Typography>52 Week High
                  </Grid>
                  <Grid item={true} xs={6} sm={6} md={6} sx={{ py: 1 }}>
                    <Typography variant="h6">{weekLow}</Typography>52 Week High
                  </Grid>
                  <Grid item={true} xs={6} sm={6} md={6} sx={{ py: 1 }}>
                    <Typography variant="h6">{peRatio}</Typography>P/E Ratio
                  </Grid>
                  <Grid item={true} xs={6} sm={6} md={6} sx={{ py: 1 }}>
                    <Typography variant="h6">{dividendPS}</Typography>Dividend
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DataSummary
                title="Market Capitalization"
                total={+marketCap}
                color="error"
                icon={<MonetizationOnTwoToneIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DataSummary
                title="Revenue TTM"
                total={+revenueTTM}
                color="info"
                icon={<CurrencyExchangeTwoToneIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DataSummary
                title="Gross Profit TTM"
                total={+grossProfitTTM}
                color="warning"
                icon={<AttachMoneyTwoToneIcon />}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DataSummary
                title="Shares Outstanding"
                total={+sharesOutstanding}
                color="error"
                icon={<QueryStatsTwoToneIcon />}
              />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
