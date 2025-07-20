import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OptimizationSuggestions = ({ suggestions }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-error bg-error/10 border-error/20';
      case 'Medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'Low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return 'AlertCircle';
      case 'Medium': return 'AlertTriangle';
      case 'Low': return 'Info';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">AI Optimization Suggestions</h3>
        <div className="flex items-center space-x-2 text-accent">
          <Icon name="Zap" size={16} />
          <span className="text-sm font-medium">AI Powered</span>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className={`border rounded-lg p-4 ${getPriorityColor(suggestion.priority)}`}>
            <div className="flex items-start space-x-3">
              <Icon name={getPriorityIcon(suggestion.priority)} size={16} className="mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{suggestion.title}</h4>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-background/50">
                    {suggestion.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-muted-foreground">
                      Impact: <span className="font-medium text-foreground">{suggestion.impact}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Effort: <span className="font-medium text-foreground">{suggestion.effort}</span>
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    {suggestion.actionLabel}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="TrendingUp" size={16} className="text-accent" />
          <div>
            <h4 className="text-sm font-medium text-foreground">Potential Portfolio Improvement</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Following these suggestions could improve your portfolio performance by up to 12-18% annually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationSuggestions;