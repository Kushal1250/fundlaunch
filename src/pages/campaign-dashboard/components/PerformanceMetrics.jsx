import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ fundingData, investorData, engagementData }) => {
  const COLORS = ['#1E40AF', '#10B981', '#D97706', '#DC2626', '#64748B'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Funding Timeline Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Funding Timeline</h3>
          <Icon name="TrendingUp" size={20} className="text-primary" />
        </div>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fundingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investor Demographics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Investor Demographics</h3>
            <Icon name="Users" size={20} className="text-primary" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={investorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {investorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {investorData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
                <span className="text-sm font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Analytics */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Engagement Analytics</h3>
            <Icon name="Activity" size={20} className="text-primary" />
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="interactions" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">Views</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-sm text-muted-foreground">Interactions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;