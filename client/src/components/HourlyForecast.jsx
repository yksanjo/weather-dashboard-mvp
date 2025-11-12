import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import './HourlyForecast.css';

function HourlyForecast({ data }) {
  if (!data || !data.hourly) return null;

  const chartData = data.hourly.map(item => ({
    time: new Date(item.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
    temp: item.temperature,
    humidity: item.humidity,
    windSpeed: item.windSpeed
  }));

  return (
    <div className="hourly-forecast-card">
      <h3>24-Hour Forecast</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.7)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#8884d8" 
              fillOpacity={1} 
              fill="url(#colorTemp)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="hourly-list">
        {data.hourly.slice(0, 6).map((hour, index) => (
          <div key={index} className="hourly-item">
            <div className="hour-time">
              {new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
            </div>
            <img src={hour.icon} alt={hour.description} className="hour-icon" />
            <div className="hour-temp">{hour.temperature}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;

