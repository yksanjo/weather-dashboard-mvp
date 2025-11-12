import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './WeatherStats.css';

function WeatherStats({ weather }) {
  if (!weather) return null;

  const windDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  const statsData = [
    { name: 'Humidity', value: weather.humidity, unit: '%', icon: '💧', color: '#4ECDC4' },
    { name: 'Wind Speed', value: weather.windSpeed, unit: 'm/s', icon: '💨', color: '#45B7D1' },
    { name: 'Pressure', value: weather.pressure, unit: 'hPa', icon: '📊', color: '#FFA07A' },
    { name: 'Visibility', value: weather.visibility, unit: 'km', icon: '👁️', color: '#98D8C8' }
  ];

  const pieData = [
    { name: 'Humidity', value: weather.humidity, color: '#4ECDC4' },
    { name: 'Other', value: 100 - weather.humidity, color: '#E0E0E0' }
  ];

  return (
    <div className="weather-stats-card">
      <h3>Weather Statistics</h3>
      
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20` }}>
              <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
            </div>
            <div className="stat-info">
              <p className="stat-label">{stat.name}</p>
              <p className="stat-value">
                {stat.value} <span className="stat-unit">{stat.unit}</span>
              </p>
              {stat.name === 'Wind Speed' && (
                <p className="stat-extra">Direction: {windDirection(weather.windDirection)}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="humidity-chart">
        <h4>Humidity Level</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="humidity-center">
          <span className="humidity-value">{weather.humidity}%</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherStats;

