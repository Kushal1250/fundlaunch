import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const InvestmentHistoryItem = ({ transaction }) => {
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'investment': return 'TrendingUp';
      case 'return': return 'ArrowDownLeft';
      case 'dividend': return 'DollarSign';
      default: return 'Activity';
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'investment': return 'text-primary';
      case 'return': return 'text-success';
      case 'dividend': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getAmountColor = (type) => {
    switch (type) {
      case 'investment': return 'text-error';
      case 'return': case'dividend': return 'text-success';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors duration-200">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-muted ${getTransactionColor(transaction.type)}`}>
        <Icon name={getTransactionIcon(transaction.type)} size={16} />
      </div>
      
      <div className="flex items-center space-x-3 flex-1">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
          <Image 
            src={transaction.campaignImage} 
            alt={transaction.campaignTitle}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-foreground">{transaction.campaignTitle}</h4>
          <p className="text-sm text-muted-foreground">{transaction.description}</p>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-xs text-muted-foreground">{transaction.date}</span>
            <span className="text-xs text-muted-foreground">{transaction.time}</span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <p className={`font-semibold ${getAmountColor(transaction.type)}`}>
          {transaction.type === 'investment' ? '-' : '+'}${transaction.amount.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground capitalize">{transaction.type}</p>
      </div>
    </div>
  );
};

export default InvestmentHistoryItem;