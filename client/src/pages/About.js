import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Stack, Container, Typography, Link } from '@mui/material';
import { Email, GitHub, LinkedIn, YouTube } from '@mui/icons-material';

export default function About() {
  return (
    <>
      <Helmet>
        <title> About</title>
      </Helmet>

      <Container>
        <Typography variant="h4" gutterBottom>
          About Stock Analytics
        </Typography>
        <Link
          color="#fff"
          sx={{ ':hover': { color: 'lightBlue' }, pr: 3 }}
          href="https://github.com/theanantchoubey/stockMarketAnalytics"
          target="_blank"
        >
          <GitHub />
        </Link>
        <Link
          color="#fff"
          sx={{ ':hover': { color: 'lightBlue' } }}
          href="https://www.youtube.com/playlist?list=PLPqS130a8EQ_qwvgiWoCuW7tQf55HRQX0"
          target="_blank"
        >
          <YouTube />
        </Link>
        <br />
        <br />
        <div>
          This is the Front End project developed by Anant Choubey. It is developed using the following stacks --:
          <ol>
            <li>React JS</li>
            <li>Framework - Material UI</li>
            <li>API - Alpha Vantage, CoinGecko, etc.</li>
            <li>Chart.JS</li>
          </ol>
        </div>
        <div>
          Following are the features of this project --:
          <ol>
            <li>Know the real time data of Stocks, Coins, etc.</li>
            <li>Read Top Finance News</li>
            <li>Search and Check about the companies Financial Data</li>
          </ol>
        </div>
        <Typography variant="h4" gutterBottom>
          About Developer
        </Typography>
        <div>
          Hello! I am Anant Choubey, a Full Stack Developer who develops websites using MERN Stack Framework. Following
          are link to my profiles --:
          <p>
            <Link
              color="#fff"
              sx={{ ':hover': { color: 'lightBlue' }, pr: 2 }}
              href="https://www.linkedin.com/in/theanantchoubey/"
              target="_blank"
            >
              <LinkedIn />
            </Link>

            <Link
              color="#fff"
              sx={{ ':hover': { color: 'lightBlue' }, pr: 2 }}
              href="https://github.com/theanantchoubey/"
              target="_blank"
            >
              <GitHub />
            </Link>

            <Link
              color="#fff"
              sx={{ ':hover': { color: 'lightBlue' }, pr: 2 }}
              href="mailto:anantchoubey039@gmail.com"
              target="_blank"
            >
              <Email />
            </Link>
            <Link
              color="#fff"
              sx={{ ':hover': { color: 'lightBlue' }, pr: 2 }}
              href="https://www.youtube.com/@theanantchoubey"
              target="_blank"
            >
              <YouTube />
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
