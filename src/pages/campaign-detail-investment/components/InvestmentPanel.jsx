import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const InvestmentPanel = ({ campaign, onInvest }) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedReward, setSelectedReward] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const suggestedAmounts = [100, 250, 500, 1000, 2500];
  
  const rewardTiers = [
    { value: 'basic', label: 'Basic Supporter - $50+', description: 'Thank you email + updates' },
    { value: 'bronze', label: 'Bronze Backer - $100+', description: 'Early access + digital rewards' },
    { value: 'silver', label: 'Silver Investor - $500+', description: 'Product sample + exclusive content' },
    { value: 'gold', label: 'Gold Partner - $1000+', description: 'Limited edition + direct access' },
    { value: 'platinum', label: 'Platinum Sponsor - $2500+', description: 'Co-branding opportunity + VIP access' }
  ];

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'crypto', label: 'Cryptocurrency' }
  ];

  const handleInvest = async () => {
    if (!investmentAmount || !paymentMethod) return;
    
    setIsProcessing(true);
    
    // Simulate investment processing
    setTimeout(() => {
      onInvest({
        amount: parseFloat(investmentAmount),
        reward: selectedReward,
        paymentMethod: paymentMethod
      });
      setIsProcessing(false);
      // Navigate to KYC if needed
      navigate('/kyc-verification-center');
    }, 2000);
  };

  const isValidAmount = investmentAmount && parseFloat(investmentAmount) >= 50;

  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Invest in this Campaign</h3>
        <p className="text-sm text-muted-foreground">
          Join {campaign.investorCount} other investors supporting this project
        </p>
      </div>

      {/* Investment Amount */}
      <div className="mb-6">
        <Input
          label="Investment Amount"
          type="number"
          placeholder="Enter amount (min $50)"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
          min="50"
          className="mb-3"
        />
        
        {/* Suggested Amounts */}
        <div className="grid grid-cols-3 gap-2">
          {suggestedAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setInvestmentAmount(amount.toString())}
              className={`p-2 text-sm rounded-md border transition-colors duration-200 ${
                investmentAmount === amount.toString()
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>

      {/* Reward Tier Selection */}
      <div className="mb-6">
        <Select
          label="Choose Reward Tier (Optional)"
          placeholder="Select a reward tier"
          options={rewardTiers}
          value={selectedReward}
          onChange={setSelectedReward}
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <Select
          label="Payment Method"
          placeholder="Select payment method"
          options={paymentMethods}
          value={paymentMethod}
          onChange={setPaymentMethod}
          required
        />
      </div>

      {/* Investment Summary */}
      {isValidAmount && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Investment Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Investment Amount:</span>
              <span className="font-medium">${parseFloat(investmentAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platform Fee (2.5%):</span>
              <span className="font-medium">${(parseFloat(investmentAmount) * 0.025).toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="font-medium">Total:</span>
              <span className="font-semibold">${(parseFloat(investmentAmount) * 1.025).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Risk Assessment */}
      <div className="mb-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Investment Risk</h4>
            <p className="text-sm text-muted-foreground mb-2">
              AI Risk Score: <span className="font-medium text-warning">Medium (6.2/10)</span>
            </p>
            <p className="text-xs text-muted-foreground">
              This investment carries moderate risk. Consider your financial situation before investing.
            </p>
          </div>
        </div>
      </div>

      {/* Invest Button */}
      <Button
        variant="default"
        fullWidth
        disabled={!isValidAmount || !paymentMethod}
        loading={isProcessing}
        onClick={handleInvest}
        className="mb-4"
      >
        {isProcessing ? 'Processing Investment...' : 'Invest Now'}
      </Button>

      {/* Security Notice */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Shield" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">Secure Investment</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Your investment is protected by our investor protection program and secure payment processing.
        </p>
      </div>

      {/* Recent Investors */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">Recent Investors</h4>
        <div className="space-y-2">
          {campaign.recentInvestors.slice(0, 3).map((investor, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={14} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{investor.name}</p>
                <p className="text-xs text-muted-foreground">
                  Invested ${investor.amount.toLocaleString()} • {investor.timeAgo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentPanel;