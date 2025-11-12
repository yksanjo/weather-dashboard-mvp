import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city);
    }
  };

  const popularCities = ['Tokyo', 'New York', 'London', 'Paris', 'Sydney', 'Dubai'];

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
          className="search-input"
          disabled={loading}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? '⏳' : '🔍'}
        </button>
      </form>
      
      <div className="popular-cities">
        <span className="popular-label">Popular:</span>
        {popularCities.map(cityName => (
          <button
            key={cityName}
            onClick={() => onSearch(cityName)}
            className="city-chip"
            disabled={loading}
          >
            {cityName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;

