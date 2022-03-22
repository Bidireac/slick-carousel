import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Divider,
  Grid,
  Typography,
  Button,
  Paper,
  CardMedia,
} from '@mui/material';
import { Box } from '@mui/system';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { NavLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StyleIcon from '@mui/icons-material/Style';
import Stars from '../components/Stars';

const containerStyle = {
  marginTop: { xs: '10vh', lg: '16vh' },
  marginBottom: '10vh',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
};
const productCenterStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
};
const priceStyle = {
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};
const categoryStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '0rem 2rem 1rem 1rem',
  textTransform: 'capitalize',
};

const ProductDetails = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProduct(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) return <Error />;
  if (!isLoaded) return <Loading />;
  const { title, price, description, category, image, rating } = product;
  return (
    <Container sx={containerStyle} maxWidth="xl">
      <Grid container spacing={4} sx={productCenterStyle}>
        <Grid item xs={12} md={6}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Button
              size="large"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 2 }}
              color="error"
            >
              Back to Products
            </Button>
          </NavLink>
          <Paper elevation={3} sx={{ borderRadius: '0.3rem' }}>
            <CardMedia
              component="img"
              image={image}
              alt={title}
              height="500"
              sx={{ borderRadius: '0.3rem', objectFit: 'contain' }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: 10 }}>
          <Typography
            gutterBottom
            variant="h4"
            component="h4"
            sx={{
              px: 5,
              py: { xs: 0, lg: 2 },
              textAlign: 'center',
              color: 'primary.main',
            }}
          >
            {title}
          </Typography>
          {rating !== undefined && (
            <Stars stars={rating.rate} reviews={rating.count} />
          )}
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ px: 3, py: 1, textTransform: 'capitalize' }}
          >
            {description}
          </Typography>
          <Box sx={categoryStyle}>
            <StyleIcon sx={{ color: 'error.main' }} />
            <Typography
              variant="subtitle1"
              component="p"
              sx={{ color: 'info.main' }}
            >
              : {category}
            </Typography>
          </Box>
          <Divider
            sx={{
              backgroundColor: 'info.main',
            }}
          />
          <Box sx={priceStyle}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large">
                Buy Now
              </Button>
            </NavLink>
            <Typography
              gutterBottom
              variant="h4"
              component="span"
              sx={{ color: 'error.main', mr: 2 }}
            >
              {price} $
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
