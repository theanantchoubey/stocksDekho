import React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography, Card, Grid } from '@mui/material';
import HomePageCard from './HomePageCard';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h3" gutterBottom>
            Home
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sm={6}>
            <HomePageCard
              imgSrc="https://img.freepik.com/free-photo/business-concept-with-graphic-holography_23-2149160932.jpg?w=1380&t=st=1687267518~exp=1687268118~hmac=f43187b9427e085d8b483c639f67cb1a1dadf82d87998f07439293001f575300"
              title="Top Shares"
              desc="Search for top shares and get company details, share price, monthly price data, and other details."
              btnContent="Explore Top Shares"
              link="stocks"
            />
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <HomePageCard imgSrc="https://img.freepik.com/free-photo/network-connection-graphic-overlay-background-computer-screen_53876-120776.jpg?size=626&ext=jpg&ga=GA1.2.1367960436.1686050496&semt=sph" 
              title="Top News"
              desc="Read top finance related news of share markets, cryptocurrency and various companies of the market."
              btnContent="Read News"
              link="news"
            />
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <HomePageCard imgSrc="https://img.freepik.com/free-photo/collection-gold-coins-with-word-currencies-them_1340-34170.jpg?w=1060&t=st=1687269501~exp=1687270101~hmac=511e1864ac72c62c7c3d179dbb443fb0710ec81239d570b0d881096668cc277a" 
              title="Top Currencies"
              desc="Check top 100 Cryptocurrecy coins of the market and check how much price changed in last 24 hours."
              btnContent="Explore Top Coins"
              link="coins"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
