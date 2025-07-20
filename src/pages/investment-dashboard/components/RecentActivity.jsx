import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'investment',
      title: 'Investment Confirmed',
      description: 'You invested $5,000 in EcoTech Solutions',
      amount: '$5,000',
      timestamp: '2 hours ago',
      status: 'completed',
      icon: 'DollarSign',
      campaign: {
        name: 'EcoTech Solutions',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
      }
    },
    {
      id: 2,
      type: 'milestone',
      title: 'Milestone Achieved',
      description: 'TechStart reached 75% funding goal',
      amount: '+8.5%',
      timestamp: '5 hours ago',
      status: 'positive',
      icon: 'Target',
      campaign: {
        name: 'TechStart',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop'
      }
    },
    {
      id: 3,
      type: 'update',
      title: 'Campaign Update',
      description: 'HealthTech Pro posted a new update',
      amount: 'New',
      timestamp: '1 day ago',
      status: 'info',
      icon: 'Bell',
      campaign: {
        name: 'HealthTech Pro',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
      }
    },
    {
      id: 4,
      type: 'return',
      title: 'Return Received',
      description: 'GreenEnergy completed successfully',
      amount: '+$1,250',
      timestamp: '2 days ago',
      status: 'completed',
      icon: 'TrendingUp',
      campaign: {
        name: 'GreenEnergy',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop'
      }
    },
    {
      id: 5,
      type: 'watchlist',
      title: 'Watchlist Alert',
      description: 'AI Startup funding deadline in 3 days',
      amount: '3 days',
      timestamp: '3 days ago',
      status: 'warning',
      icon: 'Clock',
      campaign: {
        name: 'AI Startup',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-accent bg-accent/10';
      case 'positive':
        return 'text-accent bg-accent/10';
      case 'info':
        return 'text-primary bg-primary/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getIconColor = (status) => {
    switch (status) {
      case 'completed':
      case 'positive':
        return 'var(--color-accent)';
      case 'info':
        return 'var(--color-primary)';
      case 'warning':
        return 'var(--color-warning)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-muted/50 rounded-lg transition-colors duration-200">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
              <Icon 
                name={activity.icon} 
                size={18} 
                color={getIconColor(activity.status)} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground mb-1">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  
                  {activity.campaign && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded overflow-hidden">
                        <Image 
                          src={activity.campaign.image} 
                          alt={activity.campaign.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.campaign.name}</span>
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
                
                <div className="text-right ml-4">
                  <span className={`text-sm font-semibold ${
                    activity.status === 'completed' || activity.status === 'positive' 
                      ? 'text-accent' 
                      : activity.status === 'warning' ?'text-warning' :'text-foreground'
                  }`}>
                    {activity.amount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center">
          <button className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
            <Icon name="RefreshCw" size={16} />
            <span>Load More Activities</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;