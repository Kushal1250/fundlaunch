import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CampaignCard = ({ campaign, onBookmark, onShare }) => {
  const [isBookmarked, setIsBookmarked] = useState(campaign.isBookmarked || false);
  const navigate = useNavigate();

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark(campaign.id, !isBookmarked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    onShare(campaign);
  };

  const handleCardClick = () => {
    navigate('/campaign-detail-investment', { state: { campaignId: campaign.id } });
  };

  const handleInvest = (e) => {
    e.stopPropagation();
    navigate('/campaign-detail-investment', { state: { campaignId: campaign.id, showInvestModal: true } });
  };

  const progressPercentage = (campaign.currentFunding / campaign.targetFunding) * 100;
  const daysRemaining = Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'text-primary bg-primary/10',
      'Healthcare': 'text-accent bg-accent/10',
      'Finance': 'text-secondary bg-secondary/10',
      'Education': 'text-warning bg-warning/10',
      'Environment': 'text-success bg-success/10'
    };
    return colors[category] || 'text-muted-foreground bg-muted';
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden hover:elevation-2 transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Campaign Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Bookmark and Share buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleBookmark}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isBookmarked 
                ? 'bg-accent text-accent-foreground' 
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
          >
            <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
          </button>
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-black/20 text-white hover:bg-black/40 flex items-center justify-center transition-all duration-200"
          >
            <Icon name="Share2" size={16} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(campaign.category)}`}>
            {campaign.category}
          </span>
        </div>

        {/* AI Score Badge */}
        {campaign.aiScore && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-black/60 text-white px-2 py-1 rounded-full flex items-center space-x-1">
              <Icon name="Zap" size={12} />
              <span className="text-xs font-medium">AI: {campaign.aiScore}/100</span>
            </div>
          </div>
        )}
      </div>

      {/* Campaign Content */}
      <div className="p-4">
        {/* Title and Company */}
        <div className="mb-3">
          <h3 className="font-semibold text-foreground text-lg line-clamp-2 mb-1">
            {campaign.title}
          </h3>
          <p className="text-sm text-muted-foreground">{campaign.company}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {campaign.description}
        </p>

        {/* Funding Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              ${campaign.currentFunding.toLocaleString()} raised
            </span>
            <span className="text-sm text-muted-foreground">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">
              Goal: ${campaign.targetFunding.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">
              {campaign.backers} backers
            </span>
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {daysRemaining > 0 ? `${daysRemaining} days left` : 'Ended'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{campaign.location}</span>
            </div>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(campaign.riskLevel)}`}>
            {campaign.riskLevel} Risk
          </span>
        </div>

        {/* Investment Button */}
        <Button
          variant="default"
          fullWidth
          onClick={handleInvest}
          disabled={daysRemaining <= 0}
          className="font-medium"
        >
          {daysRemaining <= 0 ? 'Campaign Ended' : 'Invest Now'}
        </Button>
      </div>
    </div>
  );
};

export default CampaignCard;