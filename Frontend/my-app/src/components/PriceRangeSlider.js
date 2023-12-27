import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const minDistance = 5;

const PriceRangeSlider = ({ onPriceChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setPriceRange([Math.min(newValue[0], priceRange[1] - minDistance), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minDistance)]);
    }
  };

  React.useEffect(() => {
    onPriceChange(priceRange[0], priceRange[1]);
  }, [priceRange, onPriceChange]);

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => 'Price'}
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        min={0}
        max={1000}
        disableSwap
      />
    </Box>
  );
};

export default PriceRangeSlider;