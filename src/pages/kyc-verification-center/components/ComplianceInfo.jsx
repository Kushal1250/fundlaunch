import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceInfo = () => {
  const complianceFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: 'Your documents are encrypted with 256-bit SSL encryption and stored securely.'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'We never share your personal information with third parties without consent.'
    },
    {
      icon: 'FileCheck',
      title: 'Regulatory Compliance',
      description: 'Our KYC process meets all SEC and FINRA regulatory requirements.'
    },
    {
      icon: 'Clock',
      title: 'Fast Processing',
      description: 'Most verifications are completed within 2-3 business days.'
    }
  ];

  const regulations = [
    'Securities and Exchange Commission (SEC)',
    'Financial Industry Regulatory Authority (FINRA)',
    'Anti-Money Laundering (AML) Compliance',
    'Customer Identification Program (CIP)'
  ];

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Security & Privacy</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name={feature.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Compliance */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Scale" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Regulatory Compliance</h3>
        </div>
        
        <p className="text-muted-foreground mb-4">
          FundLaunch is fully compliant with financial regulations and industry standards:
        </p>
        
        <div className="space-y-2">
          {regulations.map((regulation, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-foreground">{regulation}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="HelpCircle" size={20} className="text-accent" />
          <h3 className="font-semibold text-accent">Need Help?</h3>
        </div>
        
        <p className="text-accent/80 mb-4">
          Our support team is available to assist you with the verification process.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-2 text-sm text-accent">
            <Icon name="Mail" size={16} />
            <span>support@fundlaunch.com</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-accent">
            <Icon name="Phone" size={16} />
            <span>1-800-FUND-123</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-accent">
            <Icon name="MessageCircle" size={16} />
            <span>Live Chat Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceInfo;