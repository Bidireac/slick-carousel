import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
      <Typography variant="h1" component="h1" sx={{ my: 6 }}>
        404
      </Typography>
      <Typography variant="h4" component="h4" sx={{ mb: 6 }}>
        Sorry, the page you visited was not found!
      </Typography>
      <Link to="/">
        <Button variant="outlined" size="large" startIcon={<ArrowBackIcon />}>
          Back Home
        </Button>
      </Link>
    </Container>
  );
};

export default ErrorPage;
