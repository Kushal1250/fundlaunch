import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WatchlistSection = () => {
  const navigate = useNavigate();

  const watchlistCampaigns = [
    {
      id: 1,
      name: 'AI-Powered Healthcare Platform',
      category: 'Healthcare',
      fundingGoal: 500000,
      currentFunding: 387500,
      fundingPercentage: 77.5,
      daysLeft: 12,
      backers: 234,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      riskLevel: 'Medium',
      expectedReturn: '15-25%',
      minInvestment: 1000
    },
    {
      id: 2,
      name: 'Sustainable Energy Solutions',
      category: 'Clean Energy',
      fundingGoal: 750000,
      currentFunding: 562500,
      fundingPercentage: 75.0,
      daysLeft: 8,
      backers: 189,
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
      riskLevel: 'Low',
      expectedReturn: '12-18%',
      minInvestment: 500
    },
    {
      id: 3,
      name: 'Next-Gen E-commerce Platform',
      category: 'Technology',
      fundingGoal: 300000,
      currentFunding: 195000,
      fundingPercentage: 65.0,
      daysLeft: 25,
      backers: 156,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
      riskLevel: 'High',
      expectedReturn: '20-35%',
      minInvestment: 2000
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'text-accent bg-accent/10';
      case 'Medium':
        return 'text-warning bg-warning/10';
      case 'High':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getUrgencyColor = (daysLeft) => {
    if (daysLeft <= 7) return 'text-error';
    if (daysLeft <= 14) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={20} color="var(--color-primary)" />
          <h3 className="text-xl font-semibold text-foreground">Watchlist</h3>
          <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
            {watchlistCampaigns.length}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/campaign-browse-discovery?tab=watchlist')}
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {watchlistCampaigns.map((campaign) => (
          <div key={campaign.id} className="border border-border rounded-lg overflow-hidden hover:elevation-2 transition-all duration-200">
            <div className="relative h-48 overflow-hidden">
              <Image 
                src={campaign.image} 
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <button className="w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200">
                  <Icon name="Heart" size={16} color="var(--color-error)" />
                </button>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(campaign.riskLevel)}`}>
                  {campaign.riskLevel} Risk
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">{campaign.name}</h4>
                  <p className="text-xs text-muted-foreground">{campaign.category}</p>
                </div>
                <div className={`text-xs font-medium ${getUrgencyColor(campaign.daysLeft)}`}>
                  {campaign.daysLeft}d left
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>${campaign.currentFunding.toLocaleString()} raised</span>
                  <span>{campaign.fundingPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(campaign.fundingPercentage, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <span>Goal: ${campaign.fundingGoal.toLocaleString()}</span>
                  <span>{campaign.backers} backers</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Expected Return:</span>
                  <span className="font-medium text-accent">{campaign.expectedReturn}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Min Investment:</span>
                  <span className="font-medium text-foreground">${campaign.minInvestment.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/campaign-detail-investment?id=${campaign.id}`)}
                  className="flex-1"
                >
                  View Details
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate(`/campaign-detail-investment?id=${campaign.id}&action=invest`)}
                  className="flex-1"
                >
                  Invest Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {watchlistCampaigns.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Bookmark" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No campaigns in watchlist</h4>
          <p className="text-muted-foreground mb-6">Start exploring campaigns and add them to your watchlist</p>
          <Button onClick={() => navigate('/campaign-browse-discovery')}>
            Browse Campaigns
          </Button>
        </div>
      )}
    </div>
  );
};

export default WatchlistSection;