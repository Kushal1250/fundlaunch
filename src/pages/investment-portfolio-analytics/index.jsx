import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import PortfolioSummaryCard from './components/PortfolioSummaryCard';
import InvestmentCard from './components/InvestmentCard';
import PerformanceChart from './components/PerformanceChart';
import InvestmentHistoryItem from './components/InvestmentHistoryItem';
import DiversificationChart from './components/DiversificationChart';
import RiskAssessmentCard from './components/RiskAssessmentCard';
import OptimizationSuggestions from './components/OptimizationSuggestions';

const InvestmentPortfolioAnalytics = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [timeRange, setTimeRange] = useState('6m');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data
  const portfolioSummary = [
    {
      title: "Total Portfolio Value",
      value: "$127,450",
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      iconColor: "bg-primary"
    },
    {
      title: "Active Investments",
      value: "23",
      change: "+3",
      changeType: "positive",
      icon: "TrendingUp",
      iconColor: "bg-accent"
    },
    {
      title: "Total Returns",
      value: "$18,230",
      change: "+8.7%",
      changeType: "positive",
      icon: "ArrowUpRight",
      iconColor: "bg-success"
    },
    {
      title: "Average ROI",
      value: "14.3%",
      change: "+2.1%",
      changeType: "positive",
      icon: "Target",
      iconColor: "bg-warning"
    }
  ];

  const activeInvestments = [
    {
      id: 1,
      title: "EcoTech Solar Solutions",
      category: "Clean Energy",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      amount: 15000,
      currentValue: 17250,
      return: 15.0,
      progress: 78,
      status: "Active",
      risk: "Medium",
      investedDate: "Mar 15, 2024",
      expectedReturn: "Dec 2024"
    },
    {
      id: 2,
      title: "HealthTech AI Platform",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
      amount: 25000,
      currentValue: 28750,
      return: 15.0,
      progress: 65,
      status: "Active",
      risk: "High",
      investedDate: "Feb 8, 2024",
      expectedReturn: "Jan 2025"
    },
    {
      id: 3,
      title: "Urban Farming Initiative",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
      amount: 10000,
      currentValue: 11200,
      return: 12.0,
      progress: 92,
      status: "Active",
      risk: "Low",
      investedDate: "Jan 20, 2024",
      expectedReturn: "Aug 2024"
    },
    {
      id: 4,
      title: "Fintech Payment Gateway",
      category: "Financial Services",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
      amount: 20000,
      currentValue: 18500,
      return: -7.5,
      progress: 45,
      status: "Active",
      risk: "High",
      investedDate: "Apr 2, 2024",
      expectedReturn: "Mar 2025"
    }
  ];

  const investmentHistory = [
    {
      id: 1,
      campaignTitle: "EcoTech Solar Solutions",
      campaignImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      type: "investment",
      amount: 15000,
      description: "Initial investment in solar technology startup",
      date: "Mar 15, 2024",
      time: "2:30 PM"
    },
    {
      id: 2,
      campaignTitle: "Urban Farming Initiative",
      campaignImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
      type: "dividend",
      amount: 450,
      description: "Quarterly dividend payment",
      date: "Jul 10, 2024",
      time: "10:15 AM"
    },
    {
      id: 3,
      campaignTitle: "HealthTech AI Platform",
      campaignImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
      type: "investment",
      amount: 25000,
      description: "Series A investment round participation",
      date: "Feb 8, 2024",
      time: "4:45 PM"
    },
    {
      id: 4,
      campaignTitle: "Smart Home Automation",
      campaignImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      type: "return",
      amount: 12500,
      description: "Partial exit - 50% stake sold",
      date: "Jun 22, 2024",
      time: "11:20 AM"
    }
  ];

  const performanceData = [
    { month: 'Jan', value: 95000 },
    { month: 'Feb', value: 102000 },
    { month: 'Mar', value: 108000 },
    { month: 'Apr', value: 115000 },
    { month: 'May', value: 112000 },
    { month: 'Jun', value: 125000 },
    { month: 'Jul', value: 127450 }
  ];

  const diversificationData = [
    { name: 'Technology', value: 45000, percentage: 35.3 },
    { name: 'Healthcare', value: 32000, percentage: 25.1 },
    { name: 'Clean Energy', value: 25000, percentage: 19.6 },
    { name: 'Financial Services', value: 15000, percentage: 11.8 },
    { name: 'Agriculture', value: 10450, percentage: 8.2 }
  ];

  const riskData = {
    overallRisk: 'Medium',
    volatility: 18.5,
    sharpeRatio: 1.42,
    maxDrawdown: 12.3,
    beta: 1.15,
    recommendation: `Your portfolio shows moderate risk with good diversification. Consider reducing exposure to high-risk tech investments and increasing allocation to stable sectors.`
  };

  const optimizationSuggestions = [
    {
      title: "Rebalance Sector Allocation",
      description: "Your technology allocation is 35.3%, which exceeds the recommended 30% for balanced risk.",
      priority: "High",
      impact: "High",
      effort: "Low",
      actionLabel: "Rebalance"
    },
    {
      title: "Diversify Geographic Exposure",
      description: "Consider adding international campaigns to reduce domestic market dependency.",
      priority: "Medium",
      impact: "Medium",
      effort: "Medium",
      actionLabel: "Explore"
    },
    {
      title: "Increase ESG Investments",
      description: "ESG-focused campaigns show 23% better long-term performance in your risk profile.",
      priority: "Low",
      impact: "High",
      effort: "Low",
      actionLabel: "Browse ESG"
    }
  ];

  const timeRangeOptions = [
    { value: '1m', label: '1 Month' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: 'all', label: 'All Time' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'energy', label: 'Clean Energy' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'agriculture', label: 'Agriculture' }
  ];

  const tabs = [
    { id: 'active', label: 'Active Investments', icon: 'TrendingUp' },
    { id: 'history', label: 'Investment History', icon: 'History' },
    { id: 'analytics', label: 'Performance Analytics', icon: 'BarChart3' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleExportPortfolio = () => {
    console.log('Exporting portfolio data...');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <button onClick={() => navigate('/investment-dashboard')} className="hover:text-foreground">
                Dashboard
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground font-medium">Portfolio Analytics</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Investment Portfolio</h1>
              <p className="text-muted-foreground">Track your investments and analyze performance</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Select
                options={timeRangeOptions}
                value={timeRange}
                onChange={setTimeRange}
                className="w-32"
              />
              <Button variant="outline" onClick={handleExportPortfolio}>
                <Icon name="Download" size={16} />
                Export
              </Button>
            </div>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {portfolioSummary.map((item, index) => (
              <PortfolioSummaryCard key={index} {...item} />
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg p-1">
                <div className="flex space-x-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span className="hidden sm:block">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'active' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Active Investments</h2>
                    <Select
                      options={categoryOptions}
                      value={filterCategory}
                      onChange={setFilterCategory}
                      placeholder="Filter by category"
                      className="w-48"
                    />
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {activeInvestments.map((investment) => (
                      <InvestmentCard key={investment.id} investment={investment} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">Investment History</h2>
                    <div className="flex items-center space-x-4">
                      <Select
                        options={categoryOptions}
                        value={filterCategory}
                        onChange={setFilterCategory}
                        placeholder="Filter by category"
                        className="w-48"
                      />
                      <Button variant="outline" size="sm">
                        <Icon name="Filter" size={16} />
                        More Filters
                      </Button>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg">
                    {investmentHistory.map((transaction) => (
                      <InvestmentHistoryItem key={transaction.id} transaction={transaction} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground">Performance Analytics</h2>
                  <PerformanceChart 
                    data={performanceData} 
                    title="Portfolio Growth Over Time"
                    type="area"
                    height={350}
                  />
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <DiversificationChart 
                      data={diversificationData} 
                      title="Portfolio Diversification"
                    />
                    <RiskAssessmentCard riskData={riskData} />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <OptimizationSuggestions suggestions={optimizationSuggestions} />
              
              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6 elevation-1">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="default" 
                    fullWidth 
                    onClick={() => navigate('/campaign-browse-discovery')}
                  >
                    <Icon name="Search" size={16} />
                    Browse New Campaigns
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={() => navigate('/investment-dashboard')}
                  >
                    <Icon name="LayoutDashboard" size={16} />
                    Investment Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth
                    onClick={() => navigate('/kyc-verification-center')}
                  >
                    <Icon name="Shield" size={16} />
                    KYC Verification
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-lg p-6 elevation-1">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon name="TrendingUp" size={14} className="text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">EcoTech reached 78% funding</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <Icon name="DollarSign" size={14} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Dividend received: $450</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Bell" size={14} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">New milestone update</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPortfolioAnalytics;