import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActions = ({ onCreateCampaign, onUpdateMilestone, onSendUpdate, onShareCampaign }) => {
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [milestoneData, setMilestoneData] = useState({ title: '', description: '', targetDate: '' });
  const [updateData, setUpdateData] = useState({ title: '', message: '' });

  const handleMilestoneSubmit = (e) => {
    e.preventDefault();
    onUpdateMilestone(milestoneData);
    setMilestoneData({ title: '', description: '', targetDate: '' });
    setShowMilestoneForm(false);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onSendUpdate(updateData);
    setUpdateData({ title: '', message: '' });
    setShowUpdateForm(false);
  };

  const quickActionButtons = [
    {
      id: 'create',
      label: 'Create New Campaign',
      icon: 'Plus',
      variant: 'default',
      action: onCreateCampaign,
      description: 'Launch a new funding campaign'
    },
    {
      id: 'milestone',
      label: 'Add Milestone',
      icon: 'Target',
      variant: 'outline',
      action: () => setShowMilestoneForm(true),
      description: 'Set project milestones'
    },
    {
      id: 'update',
      label: 'Send Update',
      icon: 'Bell',
      variant: 'outline',
      action: () => setShowUpdateForm(true),
      description: 'Notify investors of progress'
    },
    {
      id: 'share',
      label: 'Share Campaign',
      icon: 'Share2',
      variant: 'outline',
      action: onShareCampaign,
      description: 'Promote your campaign'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Action Buttons */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActionButtons.map((action) => (
            <div key={action.id} className="text-center">
              <Button
                variant={action.variant}
                onClick={action.action}
                className="w-full mb-2"
                iconName={action.icon}
                iconPosition="left"
                iconSize={16}
              >
                {action.label}
              </Button>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Form Modal */}
      {showMilestoneForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md elevation-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Add Milestone</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMilestoneForm(false)}
                iconName="X"
                iconSize={16}
              />
            </div>
            <form onSubmit={handleMilestoneSubmit} className="space-y-4">
              <Input
                label="Milestone Title"
                type="text"
                placeholder="Enter milestone title"
                value={milestoneData.title}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
              <Input
                label="Description"
                type="text"
                placeholder="Describe the milestone"
                value={milestoneData.description}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
              <Input
                label="Target Date"
                type="date"
                value={milestoneData.targetDate}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, targetDate: e.target.value }))}
                required
              />
              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="flex-1">
                  Add Milestone
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowMilestoneForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Form Modal */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md elevation-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Send Update</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUpdateForm(false)}
                iconName="X"
                iconSize={16}
              />
            </div>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <Input
                label="Update Title"
                type="text"
                placeholder="Enter update title"
                value={updateData.title}
                onChange={(e) => setUpdateData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  placeholder="Write your update message..."
                  value={updateData.message}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="flex-1">
                  Send Update
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUpdateForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;