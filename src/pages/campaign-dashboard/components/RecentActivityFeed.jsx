import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'investment':
        return 'DollarSign';
      case 'comment':
        return 'MessageCircle';
      case 'milestone':
        return 'Target';
      case 'update':
        return 'Bell';
      case 'share':
        return 'Share2';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'investment':
        return 'text-success';
      case 'comment':
        return 'text-primary';
      case 'milestone':
        return 'text-accent';
      case 'update':
        return 'text-warning';
      case 'share':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-primary" />
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-muted/50 rounded-lg transition-colors duration-200">
            <div className="flex-shrink-0">
              {activity.userAvatar ? (
                <Image
                  src={activity.userAvatar}
                  alt={activity.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.userName}</span>
                    {' '}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  
                  {activity.amount && (
                    <p className="text-sm font-semibold text-success mt-1">
                      ${activity.amount.toLocaleString()}
                    </p>
                  )}
                  
                  {activity.message && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      "{activity.message}"
                    </p>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>

                <div className="flex-shrink-0 ml-2">
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={16} 
                    className={getActivityColor(activity.type)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;