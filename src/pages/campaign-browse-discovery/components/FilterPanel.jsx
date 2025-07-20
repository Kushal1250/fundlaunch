import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onApplyFilters, onResetFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Environment', 
    'Entertainment', 'Food & Beverage', 'Fashion', 'Real Estate', 'Manufacturing'
  ];

  const fundingStages = [
    { value: 'pre_seed', label: 'Pre-Seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series_a', label: 'Series A' },
    { value: 'series_b', label: 'Series B' },
    { value: 'growth', label: 'Growth' }
  ];

  const locations = [
    'United States', 'United Kingdom', 'Canada', 'Germany', 'France', 
    'Australia', 'Singapore', 'Japan', 'India', 'Brazil'
  ];

  const riskLevels = ['Low', 'Medium', 'High'];

  const handleCategoryChange = (category, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      category: checked 
        ? [...(prev.category || []), category]
        : (prev.category || []).filter(c => c !== category)
    }));
  };

  const handleFundingStageChange = (stage, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      fundingStage: checked 
        ? [...(prev.fundingStage || []), stage]
        : (prev.fundingStage || []).filter(s => s !== stage)
    }));
  };

  const handleLocationChange = (location, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      location: checked 
        ? [...(prev.location || []), location]
        : (prev.location || []).filter(l => l !== location)
    }));
  };

  const handleRiskLevelChange = (risk, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      riskLevel: checked 
        ? [...(prev.riskLevel || []), risk]
        : (prev.riskLevel || []).filter(r => r !== risk)
    }));
  };

  const handleFundingRangeChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      fundingRange: {
        ...prev.fundingRange,
        [field]: parseInt(value) || 0
      }
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      category: [],
      fundingStage: [],
      location: [],
      riskLevel: [],
      fundingRange: { min: 0, max: 10000000 },
      duration: '',
      successProbability: ''
    };
    setLocalFilters(resetFilters);
    onResetFilters();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border z-50 transform transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:relative lg:translate-x-0 lg:w-80 lg:border-r lg:border-l-0`}>
        
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          
          {/* Category Filter */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Category</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map(category => (
                <Checkbox
                  key={category}
                  label={category}
                  checked={(localFilters.category || []).includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Funding Stage Filter */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Funding Stage</h3>
            <div className="space-y-2">
              {fundingStages.map(stage => (
                <Checkbox
                  key={stage.value}
                  label={stage.label}
                  checked={(localFilters.fundingStage || []).includes(stage.value)}
                  onChange={(e) => handleFundingStageChange(stage.value, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Location</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {locations.map(location => (
                <Checkbox
                  key={location}
                  label={location}
                  checked={(localFilters.location || []).includes(location)}
                  onChange={(e) => handleLocationChange(location, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Risk Level Filter */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Risk Level</h3>
            <div className="space-y-2">
              {riskLevels.map(risk => (
                <Checkbox
                  key={risk}
                  label={`${risk} Risk`}
                  checked={(localFilters.riskLevel || []).includes(risk)}
                  onChange={(e) => handleRiskLevelChange(risk, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Funding Range Filter */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Funding Range</h3>
            <div className="space-y-3">
              <Input
                label="Minimum Amount ($)"
                type="number"
                placeholder="0"
                value={localFilters.fundingRange?.min || ''}
                onChange={(e) => handleFundingRangeChange('min', e.target.value)}
              />
              <Input
                label="Maximum Amount ($)"
                type="number"
                placeholder="10,000,000"
                value={localFilters.fundingRange?.max || ''}
                onChange={(e) => handleFundingRangeChange('max', e.target.value)}
              />
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Campaign Duration</h3>
            <Input
              label="Maximum Days Remaining"
              type="number"
              placeholder="30"
              value={localFilters.duration || ''}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, duration: e.target.value }))}
            />
          </div>

          {/* Success Probability Filter */}
          <div>
            <h3 className="font-medium text-foreground mb-3">AI Success Probability</h3>
            <Input
              label="Minimum Success Rate (%)"
              type="number"
              placeholder="70"
              min="0"
              max="100"
              value={localFilters.successProbability || ''}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, successProbability: e.target.value }))}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4">
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;