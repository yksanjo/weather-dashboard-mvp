import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherStats from './components/WeatherStats';
import './App.css';

const API_URL = 'http://localhost:3001/api';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState('Tokyo');

  useEffect(() => {
    fetchWeather(currentCity);
  }, []);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherRes, hourlyRes, forecastRes] = await Promise.all([
        axios.get(`${API_URL}/weather/${city}`),
        axios.get(`${API_URL}/hourly/${city}`),
        axios.get(`${API_URL}/forecast/${city}`)
      ]);

      setCurrentWeather(weatherRes.data);
      setHourlyForecast(hourlyRes.data);
      setDailyForecast(forecastRes.data);
      setCurrentCity(city);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city) => {
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const getBackgroundGradient = () => {
    if (!currentWeather) return 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
    
    const temp = currentWeather.temperature;
    if (temp >= 30) return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'; // Hot
    if (temp >= 20) return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'; // Warm
    if (temp >= 10) return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'; // Mild
    if (temp >= 0) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; // Cool
    return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'; // Cold
  };

  return (
    <div className="app" style={{ background: getBackgroundGradient() }}>
      <div className="app-container">
        <header className="app-header">
          <h1>🌤️ Weather Dashboard</h1>
          <p>Beautiful weather visualizations</p>
        </header>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {loading && !currentWeather && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {currentWeather && !loading && (
          <main className="weather-content">
            <CurrentWeather weather={currentWeather} />
            
            <div className="forecast-section">
              <HourlyForecast data={hourlyForecast} />
              <DailyForecast data={dailyForecast} />
            </div>

            <WeatherStats weather={currentWeather} />
          </main>
        )}
      </div>
    </div>
  );
}

export default App;

