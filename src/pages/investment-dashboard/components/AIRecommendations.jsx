import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AIRecommendations = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const recommendations = [
    {
      id: 1,
      name: 'Quantum Computing Startup',
      category: 'Technology',
      matchScore: 95,
      reasoning: `Based on your investment history in tech startups and preference for high-growth potential companies, this quantum computing venture aligns perfectly with your portfolio strategy.`,
      fundingGoal: 1000000,
      currentFunding: 650000,
      fundingPercentage: 65,
      daysLeft: 18,
      expectedReturn: '25-40%',
      riskLevel: 'High',
      minInvestment: 5000,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      highlights: ['Experienced team', 'Patent pending', 'Strategic partnerships']
    },
    {
      id: 2,
      name: 'Sustainable Agriculture Tech',
      category: 'AgriTech',
      matchScore: 88,
      reasoning: `This sustainable agriculture technology matches your ESG investment criteria and complements your existing clean energy investments for better portfolio diversification.`,
      fundingGoal: 500000,
      currentFunding: 325000,
      fundingPercentage: 65,
      daysLeft: 22,
      expectedReturn: '18-28%',
      riskLevel: 'Medium',
      minInvestment: 2500,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      highlights: ['Proven technology', 'Government grants', 'Growing market']
    },
    {
      id: 3,
      name: 'Fintech Payment Solution',
      category: 'Financial Services',
      matchScore: 82,
      reasoning: `Given your successful investments in financial technology and preference for B2B solutions, this payment platform offers strong growth potential in the expanding fintech market.`,
      fundingGoal: 750000,
      currentFunding: 487500,
      fundingPercentage: 65,
      daysLeft: 15,
      expectedReturn: '20-30%',
      riskLevel: 'Medium',
      minInvestment: 3000,
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      highlights: ['Regulatory approval', 'Enterprise clients', 'Scalable model']
    }
  ];

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-accent bg-accent/10';
    if (score >= 80) return 'text-primary bg-primary/10';
    return 'text-warning bg-warning/10';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return 'text-accent bg-accent/10';
      case 'Medium':
        return 'text-warning bg-warning/10';
      case 'High':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={18} color="white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">AI Recommendations</h3>
            <p className="text-sm text-muted-foreground">Personalized investment opportunities</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>

      <div className="space-y-6">
        {recommendations.slice(0, isExpanded ? recommendations.length : 2).map((rec) => (
          <div key={rec.id} className="border border-border rounded-lg p-6 hover:elevation-1 transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
              <div className="w-full lg:w-48 h-32 lg:h-24 rounded-lg overflow-hidden mb-4 lg:mb-0 flex-shrink-0">
                <Image 
                  src={rec.image} 
                  alt={rec.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">{rec.name}</h4>
                    <p className="text-sm text-muted-foreground">{rec.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMatchScoreColor(rec.matchScore)}`}>
                      {rec.matchScore}% Match
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(rec.riskLevel)}`}>
                      {rec.riskLevel} Risk
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{rec.reasoning}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Expected Return</p>
                    <p className="text-sm font-semibold text-accent">{rec.expectedReturn}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Min Investment</p>
                    <p className="text-sm font-semibold text-foreground">${rec.minInvestment.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Days Left</p>
                    <p className="text-sm font-semibold text-warning">{rec.daysLeft} days</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>${rec.currentFunding.toLocaleString()} raised</span>
                    <span>{rec.fundingPercentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${rec.fundingPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Goal: ${rec.fundingGoal.toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {rec.highlights.map((highlight, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                      <Icon name="Check" size={12} className="mr-1" />
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/campaign-detail-investment?id=${rec.id}`)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => navigate(`/campaign-detail-investment?id=${rec.id}&action=invest`)}
                    className="flex-1"
                  >
                    Invest Now
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="sm:w-auto"
                  >
                    <Icon name="Bookmark" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && recommendations.length > 2 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(true)}
          >
            View {recommendations.length - 2} More Recommendations
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;