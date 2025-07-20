import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Browse Campaigns',
      description: 'Discover new investment opportunities',
      icon: 'Search',
      color: 'bg-primary text-primary-foreground',
      action: () => navigate('/campaign-browse-discovery')
    },
    {
      title: 'View Watchlist',
      description: 'Check your saved campaigns',
      icon: 'Bookmark',
      color: 'bg-accent text-accent-foreground',
      action: () => navigate('/campaign-browse-discovery?tab=watchlist')
    },
    {
      title: 'Investment History',
      description: 'Review past investments',
      icon: 'History',
      color: 'bg-secondary text-secondary-foreground',
      action: () => navigate('/investment-portfolio-analytics')
    },
    {
      title: 'Portfolio Analytics',
      description: 'Detailed performance analysis',
      icon: 'BarChart3',
      color: 'bg-warning text-warning-foreground',
      action: () => navigate('/investment-portfolio-analytics')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="group p-6 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg transition-all duration-200 hover:elevation-2 text-left"
          >
            <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={action.icon} size={24} />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-2">{action.title}</h4>
            <p className="text-xs text-muted-foreground">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;