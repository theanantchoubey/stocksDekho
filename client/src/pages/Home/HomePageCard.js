import React from 'react';
// @mui
import { Button,  Stack, Typography, Card, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function HomePageCard(props) {
  return (
    <>
      <Card
        sx={{
          backdropFilter: 'blur(25px) saturate(200%)',
          WebkitBackdropFilter: 'blur(25px) saturate(200%)',
          backgroundColor: 'rgba(17, 25, 40, 1)',
          border: '1px solid rgba(255, 255, 255, 0.125)',
        }}
      >
        <img width="100%" height={300} src={props.imgSrc} />
        <Paper
          sx={{
            backdropFilter: 'blur(25px) saturate(200%)',
            WebkitBackdropFilter: 'blur(25px) saturate(200%)',
            backgroundColor: 'rgba(17, 25, 40, 1)',
            p: 2,
          }}
        >
          <Stack>
            <Typography variant="h5" mb={1}>
              {props.title}
            </Typography>
            <Typography variant="p1" mb={2}>
              {props.desc}
            </Typography>
          </Stack>
          <Button sx={{}} to={`/dashboard/` + props.link} component={RouterLink} variant="contained">
            {props.btnContent}
          </Button>
        </Paper>
      </Card>
    </>
  );
}
