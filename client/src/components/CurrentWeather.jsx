import React from 'react';
import './CurrentWeather.css';

function CurrentWeather({ weather }) {
  if (!weather) return null;

  return (
    <div className="current-weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>{weather.city}</h2>
          <p>{weather.country}</p>
        </div>
        <div className="weather-icon-container">
          <img src={weather.icon} alt={weather.description} className="weather-icon" />
        </div>
      </div>

      <div className="temperature-section">
        <div className="main-temp">
          <span className="temp-value">{weather.temperature}°</span>
          <span className="temp-unit">C</span>
        </div>
        <div className="temp-details">
          <p className="description">{weather.description}</p>
          <p className="feels-like">Feels like {weather.feelsLike}°C</p>
        </div>
      </div>

      <div className="sun-times">
        <div className="sun-item">
          <span className="sun-icon">🌅</span>
          <div>
            <p className="sun-label">Sunrise</p>
            <p className="sun-time">{weather.sunrise}</p>
          </div>
        </div>
        <div className="sun-item">
          <span className="sun-icon">🌇</span>
          <div>
            <p className="sun-label">Sunset</p>
            <p className="sun-time">{weather.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;

