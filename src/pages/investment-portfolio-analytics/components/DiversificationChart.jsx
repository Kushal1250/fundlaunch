import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DiversificationChart = ({ data, title }) => {
  const COLORS = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-warning)',
    'var(--color-secondary)',
    'var(--color-success)',
    'var(--color-error)'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            ${data.value?.toLocaleString()} ({data.payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ percentage }) => `${percentage}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiversificationChart;