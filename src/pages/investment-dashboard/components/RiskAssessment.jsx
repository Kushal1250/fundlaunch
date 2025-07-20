import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const RiskAssessment = () => {
  const [activeView, setActiveView] = useState('overview');

  const portfolioRisk = {
    overallScore: 6.8,
    riskLevel: 'Moderate',
    diversificationScore: 78,
    recommendation: 'Consider adding more low-risk investments to balance your portfolio'
  };

  const riskDistribution = [
    { name: 'Low Risk', value: 25, amount: 37500, color: '#10B981' },
    { name: 'Medium Risk', value: 50, amount: 75000, color: '#D97706' },
    { name: 'High Risk', value: 25, amount: 37500, color: '#DC2626' }
  ];

  const industryRisk = [
    { industry: 'Technology', risk: 7.2, exposure: 35 },
    { industry: 'Healthcare', risk: 5.8, exposure: 25 },
    { industry: 'Finance', risk: 6.5, exposure: 20 },
    { industry: 'E-commerce', risk: 8.1, exposure: 15 },
    { industry: 'Others', risk: 4.2, exposure: 5 }
  ];

  const riskMetrics = [
    {
      title: 'Portfolio Volatility',
      value: '18.5%',
      status: 'moderate',
      description: 'Expected price fluctuation range',
      icon: 'TrendingUp'
    },
    {
      title: 'Diversification Score',
      value: '78/100',
      status: 'good',
      description: 'Portfolio spread across sectors',
      icon: 'PieChart'
    },
    {
      title: 'Concentration Risk',
      value: 'Medium',
      status: 'moderate',
      description: 'Risk from over-concentration',
      icon: 'Target'
    },
    {
      title: 'Liquidity Risk',
      value: 'Low',
      status: 'good',
      description: 'Ability to exit investments',
      icon: 'Droplets'
    }
  ];

  const recommendations = [
    {
      type: 'diversification',
      title: 'Improve Diversification',
      description: 'Consider adding investments in renewable energy or agriculture sectors',
      priority: 'high',
      impact: '+12% diversification score'
    },
    {
      type: 'risk-balance',
      title: 'Balance Risk Profile',
      description: 'Add 2-3 low-risk investments to reduce overall portfolio volatility',
      priority: 'medium',
      impact: '-3.2% portfolio risk'
    },
    {
      type: 'liquidity',
      title: 'Enhance Liquidity',
      description: 'Consider some shorter-term investments for better liquidity',
      priority: 'low',
      impact: 'Improved exit flexibility'
    }
  ];

  const getRiskColor = (score) => {
    if (score <= 4) return 'text-accent';
    if (score <= 7) return 'text-warning';
    return 'text-error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-accent bg-accent/10';
      case 'moderate':
        return 'text-warning bg-warning/10';
      case 'high':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 elevation-2">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Icon name="Shield" size={20} color="var(--color-warning)" />
          <h3 className="text-xl font-semibold text-foreground">Risk Assessment</h3>
        </div>
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === 'overview' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-background'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveView('detailed')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeView === 'detailed' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-background'
            }`}
          >
            Detailed
          </button>
        </div>
      </div>

      {activeView === 'overview' ? (
        <div className="space-y-6">
          {/* Overall Risk Score */}
          <div className="text-center p-6 bg-muted/30 rounded-lg">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="w-full h-full rounded-full border-8 border-muted flex items-center justify-center">
                <div className={`text-2xl font-bold ${getRiskColor(portfolioRisk.overallScore)}`}>
                  {portfolioRisk.overallScore}
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-8 border-transparent"
                   style={{
                     borderTopColor: portfolioRisk.overallScore <= 4 ? 'var(--color-accent)' : 
                                   portfolioRisk.overallScore <= 7 ? 'var(--color-warning)' : 'var(--color-error)',
                     transform: `rotate(${(portfolioRisk.overallScore / 10) * 360}deg)`
                   }}>
              </div>
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              {portfolioRisk.riskLevel} Risk Portfolio
            </h4>
            <p className="text-sm text-muted-foreground">{portfolioRisk.recommendation}</p>
          </div>

          {/* Risk Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {riskMetrics.map((metric, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Icon name={metric.icon} size={20} color="var(--color-muted-foreground)" />
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
                <h5 className="text-sm font-semibold text-foreground mb-1">{metric.title}</h5>
                <p className="text-lg font-bold text-foreground mb-2">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            ))}
          </div>

          {/* Risk Distribution Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Risk Distribution</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground mb-4">Risk Breakdown</h4>
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
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
        </div>
      ) : (
        <div className="space-y-6">
          {/* Industry Risk Analysis */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Industry Risk Analysis</h4>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryRisk} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="industry" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="risk" fill="var(--color-warning)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Risk Management Recommendations</h4>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
                      <div>
                        <h5 className="text-sm font-semibold text-foreground">{rec.title}</h5>
                        <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} priority
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-accent font-medium">{rec.impact}</span>
                    <button className="text-xs text-primary hover:text-primary/80 font-medium">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessment;