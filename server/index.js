const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// OpenWeatherMap API key (you'll need to get one from openweathermap.org)
const API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Helper function to get weather icon
function getWeatherIcon(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Get current weather by city name
app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;
    res.json({
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: getWeatherIcon(data.weather[0].icon),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility / 1000, // Convert to km
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      coord: data.coord
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
});

// Get weather by coordinates
app.get('/api/weather/coord/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });

    const data = response.data;
    res.json({
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: getWeatherIcon(data.weather[0].icon),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility / 1000,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      coord: data.coord
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get 5-day forecast
app.get('/api/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    const forecast = response.data.list.map(item => ({
      date: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      feelsLike: Math.round(item.main.feels_like),
      description: item.weather[0].description,
      icon: getWeatherIcon(item.weather[0].icon),
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      pressure: item.main.pressure
    }));

    res.json({
      city: response.data.city.name,
      country: response.data.city.country,
      forecast
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
  }
});

// Get hourly forecast (next 24 hours)
app.get('/api/hourly/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    // Get next 8 forecasts (24 hours, 3-hour intervals)
    const hourly = response.data.list.slice(0, 8).map(item => ({
      time: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      icon: getWeatherIcon(item.weather[0].icon),
      description: item.weather[0].description,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed
    }));

    res.json({
      city: response.data.city.name,
      hourly
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hourly forecast' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Weather Dashboard API is running',
    apiKeyConfigured: API_KEY !== 'demo_key'
  });
});

app.listen(PORT, () => {
  console.log(`🌤️  Weather Dashboard API running on http://localhost:${PORT}`);
  if (API_KEY === 'demo_key') {
    console.log('⚠️  Warning: Using demo API key. Get a free key from openweathermap.org');
  }
});

