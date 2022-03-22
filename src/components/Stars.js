import React from 'react';
import { Typography, Box } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';

const starContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const Stars = ({ stars, reviews }) => {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <Typography variant="subtitle1" component="span" key={index}>
        {stars >= index + 1 ? (
          <StarIcon />
        ) : stars >= number ? (
          <StarHalfIcon />
        ) : (
          <StarOutlineIcon />
        )}
      </Typography>
    );
  });

  return (
    <Box sx={starContainer}>
      <Box sx={{ color: 'warning.light' }}>{tempStars}</Box>
      <Typography
        variant="subtitle1"
        component="span"
        sx={{ color: 'info.main' }}
      >
        ({reviews} customer reviews)
      </Typography>
    </Box>
  );
};

export default Stars;
