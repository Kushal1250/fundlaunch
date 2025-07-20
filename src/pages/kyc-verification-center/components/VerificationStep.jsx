import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import DocumentUpload from './DocumentUpload';

const VerificationStep = ({ 
  step, 
  title, 
  description, 
  status, 
  requirements, 
  onComplete,
  isActive,
  onActivate 
}) => {
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-warning';
      case 'pending':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleDocumentUpload = (document) => {
    setUploadedDocuments(prev => [...prev, document]);
  };

  const handleSubmitStep = () => {
    if (uploadedDocuments.length > 0) {
      onComplete(step);
    }
  };

  return (
    <div className={`border border-border rounded-lg transition-all duration-200 ${
      isActive ? 'bg-card elevation-2' : 'bg-muted/30'
    }`}>
      <div 
        className="p-6 cursor-pointer"
        onClick={() => !isActive && status !== 'completed' && onActivate(step)}
      >
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 ${getStatusColor()}`}>
            <Icon name={getStatusIcon()} size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Step {step}: {title}
                </h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
              {!isActive && status !== 'completed' && (
                <Button variant="outline" size="sm">
                  Start
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isActive && (
        <div className="px-6 pb-6 border-t border-border mt-4 pt-6">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Requirements:</h4>
              <ul className="space-y-2">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <DocumentUpload
              stepType={step}
              onUpload={handleDocumentUpload}
              uploadedDocuments={uploadedDocuments}
            />

            {uploadedDocuments.length > 0 && (
              <div className="flex justify-end space-x-3">
                <Button variant="outline">
                  Save Draft
                </Button>
                <Button onClick={handleSubmitStep}>
                  Submit for Review
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {status === 'completed' && (
        <div className="px-6 pb-6 border-t border-success/20 mt-4 pt-6 bg-success/5">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <p className="font-medium text-success">Verification Complete</p>
              <p className="text-sm text-success/80">
                Approved on {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationStep;