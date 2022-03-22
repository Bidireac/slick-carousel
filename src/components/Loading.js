import React from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';

const containerStyle = {
  marginTop: { xs: '10vh', lg: '16vh' },
  marginBottom: '10vh',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

const ErrorPage = () => {
  return (
    <Container sx={containerStyle} maxWidth="xl">
      <Typography color="primary" variant="h4" component="p" sx={{ m: 10 }}>
        <CircularProgress color="primary" /> Loading...
      </Typography>
    </Container>
  );
};

export default ErrorPage;
