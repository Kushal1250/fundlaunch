import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CampaignOverviewCard from './components/CampaignOverviewCard';
import PerformanceMetrics from './components/PerformanceMetrics';
import RecentActivityFeed from './components/RecentActivityFeed';
import AIInsightsPanel from './components/AIInsightsPanel';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CampaignDashboard = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockCampaigns = [
    {
      id: 1,
      title: "EcoTech Smart Water Purifier",
      status: "Active",
      currentAmount: 75000,
      goalAmount: 100000,
      investorCount: 42,
      daysRemaining: 18,
      category: "Technology",
      description: "Revolutionary water purification system using AI-powered filtration technology"
    },
    {
      id: 2,
      title: "Urban Farming Solutions",
      status: "Pending",
      currentAmount: 25000,
      goalAmount: 80000,
      investorCount: 15,
      daysRemaining: 45,
      category: "Agriculture",
      description: "Vertical farming systems for urban environments"
    },
    {
      id: 3,
      title: "Green Energy Storage",
      status: "Funded",
      currentAmount: 150000,
      goalAmount: 120000,
      investorCount: 89,
      daysRemaining: 0,
      category: "Energy",
      description: "Next-generation battery technology for renewable energy storage"
    }
  ];

  const mockFundingData = [
    { date: "Jan", amount: 5000 },
    { date: "Feb", amount: 12000 },
    { date: "Mar", amount: 18000 },
    { date: "Apr", amount: 25000 },
    { date: "May", amount: 35000 },
    { date: "Jun", amount: 45000 },
    { date: "Jul", amount: 75000 }
  ];

  const mockInvestorData = [
    { name: "Individual", value: 65 },
    { name: "Institutional", value: 25 },
    { name: "Angel", value: 10 }
  ];

  const mockEngagementData = [
    { date: "Week 1", views: 1200, interactions: 85 },
    { date: "Week 2", views: 1800, interactions: 120 },
    { date: "Week 3", views: 2200, interactions: 165 },
    { date: "Week 4", views: 2800, interactions: 210 }
  ];

  const mockActivities = [
    {
      id: 1,
      type: "investment",
      userName: "Sarah Johnson",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      action: "invested in your campaign",
      amount: 5000,
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: "comment",
      userName: "Michael Chen",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      action: "commented on your campaign",
      message: "This looks like a promising project! When do you expect to reach the next milestone?",
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 3,
      type: "milestone",
      userName: "System",
      action: "milestone completed",
      message: "Prototype development phase completed successfully",
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 4,
      type: "investment",
      userName: "Emma Rodriguez",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      action: "invested in your campaign",
      amount: 2500,
      timestamp: new Date(Date.now() - 3600000)
    }
  ];

  const mockAIInsights = [
    {
      title: "Funding Momentum Analysis",
      description: "Your campaign is experiencing strong momentum with a 35% increase in daily investments over the past week. This trend suggests you\'ll reach your funding goal 5 days ahead of schedule.",
      impact: "High"
    },
    {
      title: "Investor Engagement Patterns",
      description: "Peak investor activity occurs between 2-4 PM EST. Consider scheduling updates and social media posts during this window to maximize engagement.",
      impact: "Medium"
    },
    {
      title: "Geographic Distribution",
      description: "65% of your investors are from the West Coast tech corridor. Expanding marketing efforts to East Coast markets could increase your investor base by an estimated 25%.",
      impact: "High"
    }
  ];

  const mockRecommendations = [
    {
      title: "Optimize Campaign Description",
      description: "Add more technical specifications and use cases to increase investor confidence. Include comparison charts with existing solutions.",
      priority: "high",
      timeToImplement: "2-3 hours"
    },
    {
      title: "Enhance Visual Content",
      description: "Upload additional product demonstration videos and infographics to improve engagement rates by an estimated 40%.",
      priority: "medium",
      timeToImplement: "1-2 days"
    },
    {
      title: "Investor Communication Strategy",
      description: "Implement weekly progress updates to maintain investor engagement and attract new backers through social proof.",
      priority: "medium",
      timeToImplement: "30 minutes weekly"
    }
  ];

  const mockPitchScore = {
    overall: 78,
    breakdown: [
      {
        category: "Problem Definition",
        score: 85,
        feedback: "Clear articulation of market problem and pain points"
      },
      {
        category: "Solution Clarity",
        score: 82,
        feedback: "Well-explained solution with good technical details"
      },
      {
        category: "Market Opportunity",
        score: 75,
        feedback: "Good market size analysis, could benefit from more competitive analysis"
      },
      {
        category: "Financial Projections",
        score: 70,
        feedback: "Realistic projections but need more detailed breakdown of costs"
      },
      {
        category: "Team Credibility",
        score: 80,
        feedback: "Strong team background, consider highlighting relevant experience more"
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setSelectedCampaign(mockCampaigns[0]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCreateCampaign = () => {
    console.log('Creating new campaign...');
    // Navigate to campaign creation page
  };

  const handleEditCampaign = (campaign) => {
    console.log('Editing campaign:', campaign.title);
    // Navigate to campaign edit page
  };

  const handleShareCampaign = (campaign) => {
    console.log('Sharing campaign:', campaign?.title || 'current campaign');
    // Implement share functionality
  };

  const handleUpdateMilestone = (milestoneData) => {
    console.log('Adding milestone:', milestoneData);
    // Implement milestone update
  };

  const handleSendUpdate = (updateData) => {
    console.log('Sending update:', updateData);
    // Implement update sending
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button 
              onClick={() => navigate('/')}
              className="hover:text-foreground transition-colors duration-200"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">My Campaigns</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Campaign Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor and manage your funding campaigns effectively
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                onClick={handleCreateCampaign}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Create New Campaign
              </Button>
            </div>
          </div>

          {/* Campaign Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {campaigns.map((campaign) => (
              <CampaignOverviewCard
                key={campaign.id}
                campaign={campaign}
                onEdit={handleEditCampaign}
                onShare={handleShareCampaign}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Performance Metrics - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <PerformanceMetrics
                fundingData={mockFundingData}
                investorData={mockInvestorData}
                engagementData={mockEngagementData}
              />
            </div>

            {/* Recent Activity Feed */}
            <div className="xl:col-span-1">
              <RecentActivityFeed activities={mockActivities} />
            </div>
          </div>

          {/* AI Insights and Quick Actions */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <AIInsightsPanel
              insights={mockAIInsights}
              pitchScore={mockPitchScore}
              recommendations={mockRecommendations}
            />
            
            <QuickActions
              onCreateCampaign={handleCreateCampaign}
              onUpdateMilestone={handleUpdateMilestone}
              onSendUpdate={handleSendUpdate}
              onShareCampaign={() => handleShareCampaign(selectedCampaign)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDashboard;