import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationProgress = ({ currentStep, steps }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <h3 className="font-semibold text-foreground mb-4">Verification Progress</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = step.status === 'completed';
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center space-x-4">
              {/* Step Indicator */}
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted 
                    ? 'bg-success text-success-foreground' 
                    : isCurrent 
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    stepNumber
                  )}
                </div>
              </div>
              
              {/* Step Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${
                      isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {/* Status Badge */}
                  <div>
                    {isCompleted && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        <Icon name="CheckCircle" size={12} className="mr-1" />
                        Complete
                      </span>
                    )}
                    {isCurrent && step.status === 'in-progress' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                        <Icon name="Clock" size={12} className="mr-1" />
                        In Review
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-10 mt-8 w-px h-6 bg-border" />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Processing Time Info */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Processing Times</p>
            <p className="text-xs text-muted-foreground">
              Identity: 1-2 days • Address: 2-3 days • Accreditation: 3-5 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationProgress;