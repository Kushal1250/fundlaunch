import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterDisplayValue = (key, value) => {
    switch (key) {
      case 'category':
        return value;
      case 'fundingStage':
        return value.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
      case 'location':
        return value;
      case 'riskLevel':
        return `${value} Risk`;
      case 'fundingRange':
        return `$${value.min.toLocaleString()} - $${value.max.toLocaleString()}`;
      case 'duration':
        return `${value} days`;
      case 'successProbability':
        return `${value}%+ Success`;
      default:
        return value;
    }
  };

  const filterEntries = Object.entries(activeFilters).filter(([key, value]) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) return true;
    return value !== null && value !== undefined && value !== '';
  });

  if (filterEntries.length === 0) return null;

  return (
    <div className="flex items-center space-x-2 px-4 py-3 bg-muted/30 border-b border-border overflow-x-auto">
      <div className="flex items-center space-x-2 min-w-0">
        <span className="text-sm font-medium text-foreground whitespace-nowrap">
          Active Filters:
        </span>
        
        <div className="flex items-center space-x-2">
          {filterEntries.map(([key, value]) => {
            if (Array.isArray(value)) {
              return value.map((item, index) => (
                <div
                  key={`${key}-${index}`}
                  className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
                >
                  <span>{getFilterDisplayValue(key, item)}</span>
                  <button
                    onClick={() => onRemoveFilter(key, item)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ));
            } else {
              return (
                <div
                  key={key}
                  className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
                >
                  <span>{getFilterDisplayValue(key, value)}</span>
                  <button
                    onClick={() => onRemoveFilter(key)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              );
            }
          })}
        </div>

        {filterEntries.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap ml-2"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;