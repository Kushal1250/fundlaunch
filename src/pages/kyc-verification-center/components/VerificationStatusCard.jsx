import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationStatusCard = ({ status, completedSteps, totalSteps }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'in-progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'pending':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Verification Complete';
      case 'in-progress':
        return 'Verification In Progress';
      case 'pending':
        return 'Verification Pending';
      default:
        return 'Not Started';
    }
  };

  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getStatusColor()}`}>
            <Icon name={getStatusIcon()} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{getStatusText()}</h3>
            <p className="text-sm text-muted-foreground">
              {completedSteps} of {totalSteps} steps completed
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{Math.round(progressPercentage)}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      {status === 'in-progress' && (
        <div className="mt-4 p-3 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm text-warning font-medium">
              Estimated processing time: 2-3 business days
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationStatusCard;