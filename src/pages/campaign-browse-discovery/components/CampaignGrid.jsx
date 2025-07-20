import React from 'react';
import CampaignCard from './CampaignCard';

const CampaignGrid = ({ campaigns, loading, onBookmark, onShare, onLoadMore, hasMore }) => {
  if (loading && campaigns.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-muted" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-5/6" />
              </div>
              <div className="h-2 bg-muted rounded" />
              <div className="flex justify-between">
                <div className="h-3 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/4" />
              </div>
              <div className="h-10 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No campaigns found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your filters or search terms to discover more investment opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onBookmark={onBookmark}
            onShare={onShare}
          />
        ))}
      </div>

      {/* Loading more indicator */}
      {loading && campaigns.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`loading-${index}`} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                </div>
                <div className="h-2 bg-muted rounded" />
                <div className="flex justify-between">
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
                <div className="h-10 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
          >
            Load More Campaigns
          </button>
        </div>
      )}
    </div>
  );
};

export default CampaignGrid;