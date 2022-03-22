import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Box,
  Button,
} from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useHover from '../utils/useHover';
import Stars from './Stars';

const imageStyle = {
  height: 250,
};
const detailsStyle = {
  width: '100%',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '2.5rem',
};
const cardStyle = {
  position: 'relative',
  maxWidth: 500,
  maxHeight: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0.5rem',
  paddingBottom: '1rem',
  margin: '1rem 0.2rem',
  transition: '0.1s ease',
};
const productNameStyle = {
  height: '2rem',
  padding: '1rem',
  textAlign: 'center',
};
const activeProduct = {
  margin: '0.1rem',
  border: '0.2rem solid',
  borderColor: 'primary.main',
};
const starsStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const marginTB = {
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
};

const CarouselCard = ({ item }) => {
  const [ref, isHovered] = useHover();
  const { id, image, price, title, rating } = item;
  // To be able to drag and slide the carousel we have to do a work-around, we first define two variables that will hold the X and Y axis position
  let navigate = useNavigate();
  let cardPositionX = 0;
  let cardPositionY = 0;

  // When we click the card, with the getBoundingClientRect() function we get the current positions of the object on the X and Y axis
  const handleMouseDown = (e) => {
    cardPositionX = e.target.getBoundingClientRect().x;
    cardPositionY = e.target.getBoundingClientRect().y;
  };
  // When we release the click, we check the card positions again, and if they match, it means that the card wasn't dragged around, only clicked so we manually send the user to the respective product page
  const handleMouseUp = (e) => {
    const link = e.target.parentElement.id;
    // e.nativeEvent.which === 1 checks to see which mouse click was pressed, 1 is for the left, 2 is for the wheel and 3 for the right click
    if (
      cardPositionX === e.target.getBoundingClientRect().x &&
      cardPositionY === e.target.getBoundingClientRect().y &&
      e.nativeEvent.which === 1
    ) {
      navigate(link);
    } else {
      e.preventDefault();
    }
  };
  return (
    <Card
      ref={ref}
      raised={true}
      sx={{
        ...cardStyle,
        ...(isHovered && activeProduct),
      }}
    >
      <CardActionArea
        id={`/product/${id}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        sx={{ height: '100%' }}
      >
        <CardMedia component="img" image={image} alt={title} sx={imageStyle} />
      </CardActionArea>
      <NavLink to={`/product/${id}`} style={{ textDecoration: 'none' }}>
        <Typography component="h2" variant="body1" sx={productNameStyle}>
          {title.length > 40 ? `${title.substring(0, 40)}...` : title}
        </Typography>
      </NavLink>
      <Box sx={{ ...starsStyle, ...marginTB }}>
        {rating !== undefined && (
          <Stars stars={rating.rate} reviews={rating.count} />
        )}
      </Box>
      <Divider sx={{ width: '45%', backgroundColor: 'error.main' }} />
      <CardContent sx={detailsStyle}>
        <Typography variant="h6" color="error.main" component="h5">
          {price} $
        </Typography>
        <NavLink to={`/product/${id}`} style={{ textDecoration: 'none' }}>
          <Button variant="outlined">Details</Button>
        </NavLink>
      </CardContent>
    </Card>
  );
};

export default CarouselCard;
