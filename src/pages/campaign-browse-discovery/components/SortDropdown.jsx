import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'funding_progress', label: 'Funding Progress', icon: 'TrendingUp' },
    { value: 'deadline', label: 'Deadline (Closest First)', icon: 'Clock' },
    { value: 'ai_score', label: 'AI Recommendation', icon: 'Zap' },
    { value: 'newest', label: 'Newest First', icon: 'Calendar' },
    { value: 'most_funded', label: 'Most Funded', icon: 'DollarSign' },
    { value: 'most_backers', label: 'Most Backers', icon: 'Users' }
  ];

  const currentSort = sortOptions.find(option => option.value === sortBy) || sortOptions[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-0"
      >
        <Icon name={currentSort.icon} size={16} />
        <span className="hidden sm:inline truncate">{currentSort.label}</span>
        <span className="sm:hidden">Sort</span>
        <Icon name="ChevronDown" size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg elevation-3 z-50">
          <div className="p-2">
            <div className="text-xs font-medium text-muted-foreground px-3 py-2 border-b border-border mb-1">
              Sort by
            </div>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option.value)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-muted ${
                  sortBy === option.value 
                    ? 'bg-primary/10 text-primary font-medium' :'text-foreground'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <span className="flex-1 text-left">{option.label}</span>
                {sortBy === option.value && (
                  <Icon name="Check" size={14} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;