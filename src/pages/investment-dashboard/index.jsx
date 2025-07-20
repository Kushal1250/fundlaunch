import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PortfolioOverview from './components/PortfolioOverview';
import PortfolioCharts from './components/PortfolioCharts';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import WatchlistSection from './components/WatchlistSection';
import AIRecommendations from './components/AIRecommendations';
import RiskAssessment from './components/RiskAssessment';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InvestmentDashboard = () => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState({
    totalInvested: 150000,
    activeInvestments: 12,
    portfolioReturn: 23750,
    returnPercentage: 15.8
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [kycStatus, setKycStatus] = useState('verified'); // verified, pending, required

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getKycStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-accent bg-accent/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'required':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getKycStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'required':
        return 'AlertCircle';
      default:
        return 'Shield';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {getGreeting()}, John! 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's your investment portfolio overview for {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/* KYC Status */}
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getKycStatusColor(kycStatus)}`}>
                    <Icon name={getKycStatusIcon(kycStatus)} size={16} className="mr-2" />
                    KYC {kycStatus === 'verified' ? 'Verified' : kycStatus === 'pending' ? 'Pending' : 'Required'}
                  </span>
                  {kycStatus !== 'verified' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/kyc-verification-center')}
                    >
                      Complete KYC
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Overview Cards */}
          <PortfolioOverview portfolioData={portfolioData} />

          {/* Quick Actions */}
          <QuickActions />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Charts and Analytics */}
            <div className="xl:col-span-2 space-y-8">
              <PortfolioCharts />
              <RiskAssessment />
              <AIRecommendations />
            </div>

            {/* Right Column - Activity and Watchlist */}
            <div className="space-y-8">
              <RecentActivity />
              
              {/* Market Insights */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
                  <h3 className="text-lg font-semibold text-foreground">Market Insights</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="ArrowUp" size={16} color="var(--color-accent)" className="mt-1" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Tech Sector Surge</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Technology campaigns are showing 23% higher success rates this quarter
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-1" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Market Volatility</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Consider diversifying into stable sectors during current market conditions
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon name="Info" size={16} color="var(--color-primary)" className="mt-1" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">New Regulations</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Updated investment guidelines now favor ESG-compliant campaigns
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">This Month's Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">New Investments</span>
                    <span className="text-sm font-semibold text-foreground">3 campaigns</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Invested</span>
                    <span className="text-sm font-semibold text-accent">+$15,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Portfolio Growth</span>
                    <span className="text-sm font-semibold text-accent">+2.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Successful Exits</span>
                    <span className="text-sm font-semibold text-foreground">1 campaign</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/investment-portfolio-analytics')}
                    className="w-full"
                  >
                    View Detailed Analytics
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Watchlist Section */}
          <WatchlistSection />

          {/* Bottom Action Bar - Mobile */}
          <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-header border-t border-border p-4 lg:hidden">
            <div className="flex items-center justify-around max-w-md mx-auto">
              <button
                onClick={() => navigate('/campaign-browse-discovery')}
                className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icon name="Search" size={20} />
                <span className="text-xs">Browse</span>
              </button>
              <button
                onClick={() => navigate('/investment-portfolio-analytics')}
                className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icon name="BarChart3" size={20} />
                <span className="text-xs">Analytics</span>
              </button>
              <button
                onClick={() => navigate('/investment-dashboard')}
                className="flex flex-col items-center space-y-1 text-primary"
              >
                <Icon name="LayoutDashboard" size={20} />
                <span className="text-xs">Dashboard</span>
              </button>
              <button
                onClick={() => navigate('/campaign-browse-discovery?tab=watchlist')}
                className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icon name="Bookmark" size={20} />
                <span className="text-xs">Watchlist</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestmentDashboard;