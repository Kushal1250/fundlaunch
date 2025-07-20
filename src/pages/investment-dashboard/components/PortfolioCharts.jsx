import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const PortfolioCharts = () => {
  const [activeChart, setActiveChart] = useState('distribution');

  const industryData = [
    { name: 'Technology', value: 35, amount: 52500, color: '#1E40AF' },
    { name: 'Healthcare', value: 25, amount: 37500, color: '#10B981' },
    { name: 'Finance', value: 20, amount: 30000, color: '#D97706' },
    { name: 'E-commerce', value: 15, amount: 22500, color: '#DC2626' },
    { name: 'Others', value: 5, amount: 7500, color: '#64748B' }
  ];

  const riskData = [
    { name: 'Low Risk', value: 40, amount: 60000 },
    { name: 'Medium Risk', value: 45, amount: 67500 },
    { name: 'High Risk', value: 15, amount: 22500 }
  ];

  const performanceData = [
    { month: 'Jan', value: 145000, return: 5.2 },
    { month: 'Feb', value: 148000, return: 7.1 },
    { month: 'Mar', value: 142000, return: 3.8 },
    { month: 'Apr', value: 155000, return: 8.9 },
    { month: 'May', value: 162000, return: 12.3 },
    { month: 'Jun', value: 158000, return: 9.7 },
    { month: 'Jul', value: 165000, return: 15.2 }
  ];

  const chartTabs = [
    { id: 'distribution', label: 'Industry Distribution', icon: 'PieChart' },
    { id: 'risk', label: 'Risk Analysis', icon: 'Shield' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {entry.name}: {entry.name === 'amount' ? `$${entry.value.toLocaleString()}` : `${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'distribution':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Investment Breakdown</h4>
              {industryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-foreground">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">${item.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{item.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'risk':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'performance':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
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
                  dataKey="return" 
                  stroke="var(--color-accent)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: 'var(--color-accent)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">Portfolio Analytics</h3>
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {chartTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeChart === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      {renderChart()}
    </div>
  );
};

export default PortfolioCharts;