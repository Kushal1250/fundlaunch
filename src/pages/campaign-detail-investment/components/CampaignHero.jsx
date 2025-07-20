import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CampaignHero = ({ campaign }) => {
  const progressPercentage = (campaign.currentAmount / campaign.goalAmount) * 100;
  const daysLeft = Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
        <Image
          src={campaign.heroImage}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Campaign Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            campaign.status === 'active' ?'bg-accent text-accent-foreground' 
              : campaign.status === 'funded' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
          }`}>
            {campaign.status === 'active' ? 'Active Campaign' : 
             campaign.status === 'funded' ? 'Successfully Funded' : 'Ending Soon'}
          </span>
        </div>

        {/* Share Button */}
        <div className="absolute top-4 right-4">
          <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors duration-200">
            <Icon name="Share2" size={20} />
          </button>
        </div>

        {/* Campaign Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            {campaign.title}
          </h1>
          <p className="text-white/90 text-sm md:text-base">
            {campaign.shortDescription}
          </p>
        </div>
      </div>

      {/* Funding Progress Bar */}
      <div className="mt-6 bg-card rounded-lg p-4 md:p-6 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              ${campaign.currentAmount.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">raised</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              {campaign.investorCount}
            </div>
            <div className="text-sm text-muted-foreground">investors</div>
          </div>
          <div className="text-center md:text-right">
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              {daysLeft > 0 ? daysLeft : 0}
            </div>
            <div className="text-sm text-muted-foreground">days left</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-accent h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-muted-foreground">
              {progressPercentage.toFixed(1)}% funded
            </span>
            <span className="text-sm font-medium text-foreground">
              Goal: ${campaign.goalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{campaign.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{campaign.category}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Launched {new Date(campaign.launchDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignHero;