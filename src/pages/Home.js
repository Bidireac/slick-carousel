import React, { useState, useEffect } from 'react';
import CarouselCard from '../components/CarouselCard';
import { Container, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// Import css files for the Carousel Component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Error from '../components/Error';
import Loading from '../components/Loading';

const containerStyle = {
  width: { xs: '80%', sm: '90%', md: '95%', xl: '100%' },
  margin: '0 auto',
  height: '100%',
  position: 'relative',
  padding: '0.5rem 0rem !important',
};
const sliderButtonStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translate(0, -50%)',
  padding: 0,
  zIndex: 999,
};
const nextButtonStyle = {
  right: { xs: '-20%', sm: '-10%', md: '-5%' },
};
const prevButtonStyle = {
  left: { xs: '-20%', sm: '-10%', md: '-5%' },
};
const sliderIconStyle = {
  fontSize: '4rem',
};

function CustomNextArrow({ onClick }) {
  return (
    <IconButton
      color="primary"
      aria-label="Slide Next Product"
      component="span"
      size="large"
      onClick={onClick}
      sx={{ ...sliderButtonStyle, ...nextButtonStyle }}
    >
      <ChevronRightIcon sx={sliderIconStyle} />
    </IconButton>
  );
}
function CustomPrevArrow({ onClick }) {
  return (
    <IconButton
      color="primary"
      aria-label="Slide Previous Product"
      component="span"
      size="large"
      onClick={onClick}
      sx={{ ...sliderButtonStyle, ...prevButtonStyle }}
    >
      <ChevronLeftIcon sx={sliderIconStyle} />
    </IconButton>
  );
}

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: 'linear',
  pauseOnHover: true,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
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

  return (
    <Container sx={containerStyle} maxWidth="xl">
      <Typography
        variant="h2"
        color="error.main"
        component="h2"
        sx={{ textAlign: 'center', my: 5 }}
      >
        Slick Carousel
      </Typography>
      <Slider {...settings}>
        {items.map((item) => {
          return <CarouselCard key={item.id} item={item} />;
        })}
      </Slider>
    </Container>
  );
};

export default Home;
