import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUpload = ({ stepType, onUpload, uploadedDocuments }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const getAcceptedFormats = () => {
    switch (stepType) {
      case 1:
        return '.jpg,.jpeg,.png,.pdf';
      case 2:
        return '.pdf,.jpg,.jpeg,.png';
      case 3:
        return '.pdf,.doc,.docx';
      default:
        return '.jpg,.jpeg,.png,.pdf';
    }
  };

  const getDocumentTypes = () => {
    switch (stepType) {
      case 1:
        return ['Government-issued ID', 'Passport', 'Driver\'s License'];
      case 2:
        return ['Utility Bill', 'Bank Statement', 'Lease Agreement'];
      case 3:
        return ['Income Statement', 'Tax Returns', 'Investment Portfolio'];
      default:
        return ['Supported Documents'];
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    setUploading(true);
    
    // Simulate upload process
    for (let file of files) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB');
        continue;
      }

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const uploadedDoc = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        status: 'uploaded'
      };
      
      onUpload(uploadedDoc);
    }
    
    setUploading(false);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeDocument = (docId) => {
    // This would typically call a parent function to remove the document
    console.log('Remove document:', docId);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div>
          <h5 className="font-medium text-foreground mb-3">Upload Documents</h5>
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
              dragActive 
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={getAcceptedFormats()}
              onChange={handleChange}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-primary" />
              </div>
              
              <div>
                <p className="text-foreground font-medium mb-1">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supported formats: JPG, PNG, PDF (Max 10MB)
                </p>
              </div>
              
              <Button 
                variant="outline" 
                onClick={onButtonClick}
                disabled={uploading}
                loading={uploading}
              >
                {uploading ? 'Uploading...' : 'Choose Files'}
              </Button>
            </div>
          </div>
        </div>

        {/* Document Types */}
        <div>
          <h5 className="font-medium text-foreground mb-3">Accepted Documents</h5>
          <div className="space-y-3">
            {getDocumentTypes().map((docType, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Icon name="FileText" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{docType}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-accent mt-0.5" />
              <div className="text-sm text-accent">
                <p className="font-medium mb-1">Document Guidelines:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Ensure documents are clear and readable</li>
                  <li>• All four corners must be visible</li>
                  <li>• Documents must be current and valid</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Documents */}
      {uploadedDocuments.length > 0 && (
        <div>
          <h5 className="font-medium text-foreground mb-3">Uploaded Documents</h5>
          <div className="space-y-2">
            {uploadedDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <Icon name="FileCheck" size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(doc.size)} • Uploaded {doc.uploadDate.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    Uploaded
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDocument(doc.id)}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;