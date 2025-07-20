import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import VerificationStatusCard from './components/VerificationStatusCard';
import VerificationStep from './components/VerificationStep';
import VerificationProgress from './components/VerificationProgress';
import ComplianceInfo from './components/ComplianceInfo';

const KYCVerificationCenter = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState('in-progress');
  const [completedSteps, setCompletedSteps] = useState(0);

  const verificationSteps = [
    {
      id: 1,
      title: 'Identity Verification',
      description: 'Upload government-issued ID and complete identity verification',
      status: 'completed',
      requirements: [
        'Government-issued photo ID (passport, driver\'s license, or national ID)',
        'Clear, high-resolution images showing all four corners',
        'Document must be current and not expired',
        'Facial recognition verification may be required'
      ]
    },
    {
      id: 2,
      title: 'Address Confirmation',
      description: 'Verify your residential address with supporting documents',
      status: 'in-progress',
      requirements: [
        'Utility bill (electricity, gas, water, or internet) from last 3 months',
        'Bank statement showing your address from last 3 months',
        'Lease agreement or property tax statement',
        'Address must match your profile information'
      ]
    },
    {
      id: 3,
      title: 'Accreditation Status',
      description: 'Verify investor accreditation for qualified investment opportunities',
      status: 'pending',
      requirements: [
        'Income verification (tax returns or pay stubs)',
        'Net worth documentation (bank statements, investment accounts)',
        'Professional certification (if applicable)',
        'Investment experience questionnaire completion'
      ]
    }
  ];

  useEffect(() => {
    const completed = verificationSteps.filter(step => step.status === 'completed').length;
    setCompletedSteps(completed);
    
    if (completed === verificationSteps.length) {
      setVerificationStatus('completed');
    } else if (completed > 0) {
      setVerificationStatus('in-progress');
    } else {
      setVerificationStatus('pending');
    }
  }, []);

  const handleStepComplete = (stepId) => {
    const updatedSteps = verificationSteps.map(step => 
      step.id === stepId ? { ...step, status: 'completed' } : step
    );
    
    const newCompleted = updatedSteps.filter(step => step.status === 'completed').length;
    setCompletedSteps(newCompleted);
    
    if (newCompleted === verificationSteps.length) {
      setVerificationStatus('completed');
    }
    
    // Move to next step
    if (stepId < verificationSteps.length) {
      setActiveStep(stepId + 1);
    }
  };

  const handleStepActivate = (stepId) => {
    setActiveStep(stepId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button 
                onClick={() => navigate('/investment-dashboard')}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Dashboard
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <button 
                onClick={() => navigate('/investment-dashboard')}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Profile
              </button>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">KYC Verification</span>
            </nav>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  KYC Verification Center
                </h1>
                <p className="text-lg text-muted-foreground">
                  Complete your identity verification to unlock full platform access and investment opportunities
                </p>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Need assistance?</p>
                  <Button variant="outline" size="sm">
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Get Help
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Verification Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Overview */}
              <VerificationStatusCard 
                status={verificationStatus}
                completedSteps={completedSteps}
                totalSteps={verificationSteps.length}
              />

              {/* Verification Steps */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  Verification Steps
                </h2>
                
                {verificationSteps.map((step) => (
                  <VerificationStep
                    key={step.id}
                    step={step.id}
                    title={step.title}
                    description={step.description}
                    status={step.status}
                    requirements={step.requirements}
                    isActive={activeStep === step.id}
                    onComplete={handleStepComplete}
                    onActivate={handleStepActivate}
                  />
                ))}
              </div>

              {/* Completion Message */}
              {verificationStatus === 'completed' && (
                <div className="bg-success/5 border border-success/20 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <Icon name="CheckCircle" size={24} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-success">Verification Complete!</h3>
                      <p className="text-success/80">
                        Your account is now fully verified and ready for investment
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={() => navigate('/investment-dashboard')}>
                      <Icon name="TrendingUp" size={16} className="mr-2" />
                      Go to Dashboard
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/campaign-browse-discovery')}
                    >
                      <Icon name="Search" size={16} className="mr-2" />
                      Browse Campaigns
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Tracker */}
              <VerificationProgress 
                currentStep={activeStep}
                steps={verificationSteps}
              />

              {/* Compliance Information */}
              <ComplianceInfo />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6 elevation-1">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={() => navigate('/investment-dashboard')}
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Back to Dashboard
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={() => navigate('/campaign-browse-discovery')}
                  >
                    <Icon name="Search" size={16} className="mr-2" />
                    Browse Campaigns
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    fullWidth
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Download Certificate
                  </Button>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-muted/50 border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="MessageCircle" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Need Support?</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Our verification specialists are here to help you through the process.
                </p>
                
                <Button variant="outline" size="sm" fullWidth>
                  <Icon name="Mail" size={16} className="mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Icon name="TrendingUp" size={16} color="white" />
              </div>
              <span className="font-semibold text-foreground">FundLaunch</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} FundLaunch. All rights reserved.</span>
              <button className="hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="hover:text-foreground transition-colors duration-200">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KYCVerificationCenter;