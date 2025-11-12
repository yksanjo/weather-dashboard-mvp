import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './DailyForecast.css';

function DailyForecast({ data }) {
  if (!data || !data.forecast) return null;

  // Group forecast by day
  const dailyData = {};
  data.forecast.forEach(item => {
    const date = new Date(item.date);
    const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    if (!dailyData[dayKey]) {
      dailyData[dayKey] = {
        date: dayKey,
        temps: [],
        icons: [],
        descriptions: []
      };
    }
    dailyData[dayKey].temps.push(item.temperature);
    dailyData[dayKey].icons.push(item.icon);
    dailyData[dayKey].descriptions.push(item.description);
  });

  // Calculate min/max for each day
  const chartData = Object.values(dailyData).map(day => ({
    date: day.date,
    max: Math.max(...day.temps),
    min: Math.min(...day.temps),
    avg: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
    icon: day.icons[Math.floor(day.icons.length / 2)], // Middle icon of the day
    description: day.descriptions[0]
  })).slice(0, 5); // Next 5 days

  return (
    <div className="daily-forecast-card">
      <h3>5-Day Forecast</h3>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.7)"
              style={{ fontSize: '11px' }}
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
            <Legend />
            <Bar dataKey="max" fill="#82ca9d" name="Max Temp" />
            <Bar dataKey="min" fill="#8884d8" name="Min Temp" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="daily-list">
        {chartData.map((day, index) => (
          <div key={index} className="daily-item">
            <div className="day-date">{day.date}</div>
            <img src={day.icon} alt={day.description} className="day-icon" />
            <div className="day-temps">
              <span className="day-max">{day.max}°</span>
              <span className="day-min">{day.min}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyForecast;

