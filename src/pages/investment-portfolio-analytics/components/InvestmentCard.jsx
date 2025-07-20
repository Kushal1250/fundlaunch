import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InvestmentCard = ({ investment }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success';
      case 'Completed': return 'bg-primary/10 text-primary';
      case 'Pending': return 'bg-warning/10 text-warning';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-success';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1 hover:elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
            <Image 
              src={investment.image} 
              alt={investment.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">{investment.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{investment.category}</p>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(investment.status)}`}>
                {investment.status}
              </span>
              <span className={`text-xs font-medium ${getRiskColor(investment.risk)}`}>
                {investment.risk} Risk
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/campaign-detail-investment')}
        >
          <Icon name="ExternalLink" size={16} />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Investment Amount</span>
          <span className="font-semibold text-foreground">${investment.amount.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Current Value</span>
          <span className="font-semibold text-foreground">${investment.currentValue.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Return</span>
          <span className={`font-semibold ${investment.return >= 0 ? 'text-success' : 'text-error'}`}>
            {investment.return >= 0 ? '+' : ''}{investment.return}%
          </span>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-foreground">{investment.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${investment.progress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Invested: {investment.investedDate}</span>
          <span>Expected: {investment.expectedReturn}</span>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;