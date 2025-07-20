import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CampaignContent = ({ campaign }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [expandedUpdate, setExpandedUpdate] = useState(null);

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'team', label: 'Team', icon: 'Users' },
    { id: 'milestones', label: 'Milestones', icon: 'Target' },
    { id: 'updates', label: 'Updates', icon: 'Bell' },
    { id: 'comments', label: 'Comments', icon: 'MessageCircle' }
  ];

  const renderDescription = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">About This Project</h3>
        <div className="prose prose-gray max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-4">
            {campaign.fullDescription}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Our innovative approach combines cutting-edge technology with sustainable practices to create a solution that addresses real market needs. We've spent the last 18 months developing and testing our prototype, and we're now ready to scale production.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With your investment, we'll be able to finalize manufacturing partnerships, complete regulatory approvals, and launch our go-to-market strategy. This is an exciting opportunity to be part of a revolutionary product that will transform the industry.
          </p>
        </div>
      </div>

      {/* Media Gallery */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Project Gallery</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {campaign.gallery.map((image, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-4">Key Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaign.keyFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
              <Icon name="CheckCircle" size={20} className="text-accent mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground mb-1">{feature.title}</h5>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Meet the Team</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaign.team.map((member, index) => (
          <div key={index} className="bg-muted rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 overflow-hidden rounded-full">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{member.name}</h4>
                <p className="text-sm text-accent mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-3">{member.bio}</p>
                <div className="flex space-x-2">
                  <button className="text-muted-foreground hover:text-foreground">
                    <Icon name="Linkedin" size={16} />
                  </button>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Icon name="Twitter" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Project Milestones</h3>
      <div className="space-y-4">
        {campaign.milestones.map((milestone, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              milestone.completed 
                ? 'bg-accent text-accent-foreground' 
                : milestone.current
                ? 'bg-warning text-warning-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {milestone.completed ? (
                <Icon name="Check" size={16} />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{milestone.title}</h4>
                <span className="text-sm text-muted-foreground">{milestone.date}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{milestone.description}</p>
              {milestone.current && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                  <p className="text-sm text-warning font-medium">Current Milestone</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Progress: {milestone.progress}% complete
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUpdates = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Campaign Updates</h3>
      <div className="space-y-4">
        {campaign.updates.map((update, index) => (
          <div key={index} className="bg-muted rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold text-foreground">{update.title}</h4>
              <span className="text-sm text-muted-foreground">{update.date}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {expandedUpdate === index ? update.content : `${update.content.substring(0, 200)}...`}
            </p>
            <button
              onClick={() => setExpandedUpdate(expandedUpdate === index ? null : index)}
              className="text-sm text-accent hover:text-accent/80 font-medium"
            >
              {expandedUpdate === index ? 'Show Less' : 'Read More'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComments = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Comments & Q&A</h3>
      
      {/* Comment Form */}
      <div className="bg-muted rounded-lg p-4">
        <textarea
          placeholder="Ask a question or leave a comment..."
          className="w-full p-3 bg-card border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          rows="3"
        />
        <div className="flex justify-end mt-3">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-200">
            Post Comment
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {campaign.comments.map((comment, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-foreground">{comment.author}</span>
                  <span className="text-sm text-muted-foreground">{comment.timeAgo}</span>
                  {comment.isInvestor && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                      Investor
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1">
                    <Icon name="ThumbsUp" size={14} />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description': return renderDescription();
      case 'team': return renderTeam();
      case 'milestones': return renderMilestones();
      case 'updates': return renderUpdates();
      case 'comments': return renderComments();
      default: return renderDescription();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6 py-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CampaignContent;