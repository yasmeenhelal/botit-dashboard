import React, { useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider'; // Adjust the import path
import './SearchBar.css'; // Import a CSS file for styling

const SearchBar = ({ onSearch }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handlePriceChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleSearch = () => {
    // Check if the end date is not before the start date
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert("End date cannot be before the start date");
      return;
    }

    // Pass the search criteria to the parent component
    onSearch({
      minPrice,
      maxPrice,
      startDate,
      endDate,
    });
  };

  return (
    <div className="search-bar-container">
      <div className="label-and-slider">
        <label className="search-bar-label">Price:</label>
        <PriceRangeSlider onPriceChange={handlePriceChange} />
      </div>
      <div className="date-inputs">
        <label className="search-bar-label">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="date-input"
        />
        <label className="search-bar-label">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="date-input"
          min={startDate} // Set the min attribute dynamically
        />
      </div>
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;