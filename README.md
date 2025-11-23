# 🌤️ Weather Dashboard MVP

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.javascript.com/) [![GitHub stars](https://img.shields.io/github/stars/yksanjo/weather-dashboard-mvp?style=social)](https://github.com/yksanjo/weather-dashboard-mvp/stargazers) [![GitHub forks](https://img.shields.io/github/forks/yksanjo/weather-dashboard-mvp.svg)](https://github.com/yksanjo/weather-dashboard-mvp/network/members) [![GitHub issues](https://img.shields.io/github/issues/yksanjo/weather-dashboard-mvp.svg)](https://github.com/yksanjo/weather-dashboard-mvp/issues)
[![Last commit](https://img.shields.io/github/last-commit/yksanjo/weather-dashboard-mvp.svg)](https://github.com/yksanjo/weather-dashboard-mvp/commits/main)


A beautiful weather dashboard with stunning visualizations, real-time forecasts, and interactive charts.

## ✨ Features

- **Current Weather Display**: Real-time weather with beautiful icons and animations
- **24-Hour Forecast**: Hourly temperature chart with area visualization
- **5-Day Forecast**: Daily forecast with min/max temperature bars
- **Weather Statistics**: Humidity, wind speed, pressure, and visibility
- **Interactive Charts**: Beautiful Recharts visualizations
- **Dynamic Backgrounds**: Background changes based on temperature
- **Multiple Locations**: Search for any city worldwide
- **Responsive Design**: Works on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd weather-dashboard-mvp
```

2. Install all dependencies:
```bash
npm run install-all
```

3. Set up your API key:
```bash
cd server
cp .env.example .env
# Edit .env and add your OpenWeatherMap API key
```

4. Get your free API key:
   - Go to [openweathermap.org](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to API keys section
   - Copy your API key
   - Add it to `server/.env`:
     ```
     OPENWEATHER_API_KEY=your_api_key_here
     ```

### Running the Application

Start both the server and client in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Start backend server
npm run server

# Terminal 2 - Start frontend client
npm run client
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 📁 Project Structure

```
weather-dashboard-mvp/
├── server/                 # Backend API
│   ├── index.js           # Express server and weather API routes
│   ├── package.json
│   └── .env.example       # Environment variables template
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── SearchBar.jsx
│   │   │   ├── CurrentWeather.jsx
│   │   │   ├── HourlyForecast.jsx
│   │   │   ├── DailyForecast.jsx
│   │   │   └── WeatherStats.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── package.json           # Root package.json
└── README.md
```

## 🎯 API Endpoints

- `GET /api/weather/:city` - Get current weather by city name
- `GET /api/weather/coord/:lat/:lon` - Get weather by coordinates
- `GET /api/forecast/:city` - Get 5-day forecast
- `GET /api/hourly/:city` - Get 24-hour hourly forecast
- `GET /api/health` - Health check

## 🎨 Visualizations

- **Temperature Area Chart**: 24-hour temperature trend
- **Bar Chart**: Min/Max temperatures for 5-day forecast
- **Pie Chart**: Humidity level visualization
- **Dynamic Backgrounds**: Changes based on temperature ranges

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Recharts
- **Backend**: Node.js, Express, Axios
- **API**: OpenWeatherMap API
- **Styling**: CSS3 with glassmorphism effects

## 📝 License

MIT License - feel free to use this project for learning or as a starting point for your own weather app!

## 🚢 Deployment

To deploy this application:

1. **Frontend**: Build and deploy to Vercel, Netlify, or GitHub Pages
   ```bash
   cd client
   npm run build
   ```

2. **Backend**: Deploy to Heroku, Railway, or Render
   - Make sure to set the `OPENWEATHER_API_KEY` environment variable
   - Update the API URL in the frontend if needed

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Support

If you have questions or need help, please open an issue on GitHub.

---

Made with ❤️ for beautiful weather visualizations

