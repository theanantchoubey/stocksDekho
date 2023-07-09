import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

// components
import { NewsCard } from '../sections/@dashboard/news';
// ----------------------------------------------------------------------


export default function NewsPage() {
  const [newsData, setNewsData] = useState({});
  const fetchData = async () => {
    const newsFeed = await axios
      .get('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo')
      .then(({ data }) => data);
    setNewsData(newsFeed);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const { feed } = newsData;
  return (
    <>
      <Helmet>
        <title> Finance News </title>
      </Helmet>
      {!feed ? <LinearProgress /> : '' }
      <Container>
        
        <Stack direction="row" alignItems="center" justifyContent="space-between" my={5}>
          <Typography variant="h4" gutterBottom>
            Top Finance News
          </Typography>
        </Stack>
        
        <Grid container spacing={3}>
          {feed ? feed.map((post, index) => <NewsCard key={index} post={post} index={index} />) : ''}
        </Grid>
      </Container>
    </>
  );
}
