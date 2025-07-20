import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioOverview = ({ portfolioData }) => {
  const { totalInvested, activeInvestments, portfolioReturn, returnPercentage } = portfolioData;

  const overviewCards = [
    {
      title: "Total Invested",
      value: `$${totalInvested.toLocaleString()}`,
      icon: "DollarSign",
      change: "+12.5%",
      changeType: "positive",
      description: "Across all campaigns"
    },
    {
      title: "Active Investments",
      value: activeInvestments.toString(),
      icon: "TrendingUp",
      change: "+3",
      changeType: "positive",
      description: "Currently funding"
    },
    {
      title: "Portfolio Return",
      value: `$${portfolioReturn.toLocaleString()}`,
      icon: "PieChart",
      change: `${returnPercentage > 0 ? '+' : ''}${returnPercentage}%`,
      changeType: returnPercentage > 0 ? "positive" : "negative",
      description: "Total returns"
    },
    {
      title: "Success Rate",
      value: "78%",
      icon: "Target",
      change: "+5.2%",
      changeType: "positive",
      description: "Campaign success"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {overviewCards.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:elevation-2 transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              card.changeType === 'positive' ? 'bg-accent/10' : 'bg-error/10'
            }`}>
              <Icon 
                name={card.icon} 
                size={24} 
                color={card.changeType === 'positive' ? 'var(--color-accent)' : 'var(--color-error)'} 
              />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              card.changeType === 'positive' ? 'text-accent' : 'text-error'
            }`}>
              <Icon 
                name={card.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{card.change}</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{card.value}</h3>
            <p className="text-sm font-medium text-muted-foreground mb-1">{card.title}</p>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioOverview;