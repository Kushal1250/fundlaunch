import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CampaignOverviewCard = ({ campaign, onEdit, onShare }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'funded':
        return 'bg-success/10 text-success border-success/20';
      case 'expired':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const progressPercentage = Math.min((campaign.currentAmount / campaign.goalAmount) * 100, 100);

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1 hover:elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{campaign.title}</h3>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(campaign)}
            iconName="Share2"
            iconSize={16}
          >
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(campaign)}
            iconName="Edit"
            iconSize={16}
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Funding Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Funding Progress</span>
            <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-semibold text-foreground">
              ${campaign.currentAmount.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              of ${campaign.goalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Users" size={16} className="text-primary mr-1" />
              <span className="text-lg font-semibold text-foreground">{campaign.investorCount}</span>
            </div>
            <span className="text-xs text-muted-foreground">Investors</span>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Icon name="Calendar" size={16} className="text-primary mr-1" />
              <span className="text-lg font-semibold text-foreground">{campaign.daysRemaining}</span>
            </div>
            <span className="text-xs text-muted-foreground">Days Left</span>
          </div>
        </div>

        {/* Campaign Category */}
        <div className="flex items-center space-x-2">
          <Icon name="Tag" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{campaign.category}</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignOverviewCard;