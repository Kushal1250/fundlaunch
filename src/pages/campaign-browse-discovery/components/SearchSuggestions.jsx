import React from 'react';
import Icon from '../../../components/AppIcon';

const SearchSuggestions = ({ suggestions, onSuggestionClick, searchQuery }) => {
  if (!suggestions || suggestions.length === 0) return null;

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="font-semibold text-primary">{part}</span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg elevation-3 z-50 max-h-80 overflow-y-auto">
      <div className="p-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-left hover:bg-muted rounded-md transition-colors duration-200"
          >
            <Icon name={suggestion.type === 'campaign' ? 'Target' : 'Search'} size={16} className="text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-foreground truncate">
                {highlightMatch(suggestion.title, searchQuery)}
              </div>
              {suggestion.subtitle && (
                <div className="text-xs text-muted-foreground truncate">
                  {suggestion.subtitle}
                </div>
              )}
            </div>
            {suggestion.type === 'campaign' && (
              <div className="text-xs text-muted-foreground">
                ${suggestion.funding?.toLocaleString()}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;