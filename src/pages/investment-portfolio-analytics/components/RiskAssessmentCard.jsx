import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskAssessmentCard = ({ riskData }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'High': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'Low': return 'Shield';
      case 'Medium': return 'AlertTriangle';
      case 'High': return 'AlertCircle';
      default: return 'Info';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Risk Assessment</h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getRiskColor(riskData.overallRisk)}`}>
          <Icon name={getRiskIcon(riskData.overallRisk)} size={16} />
          <span className="text-sm font-medium">{riskData.overallRisk} Risk</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Portfolio Volatility</span>
          <span className="font-medium text-foreground">{riskData.volatility}%</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
          <span className="font-medium text-foreground">{riskData.sharpeRatio}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Max Drawdown</span>
          <span className="font-medium text-error">-{riskData.maxDrawdown}%</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Beta</span>
          <span className="font-medium text-foreground">{riskData.beta}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Risk Recommendation</h4>
            <p className="text-xs text-muted-foreground">
              {riskData.recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentCard;