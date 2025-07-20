import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsPanel = ({ insights, pitchScore, recommendations }) => {
  const [activeTab, setActiveTab] = useState('insights');

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const tabs = [
    { id: 'insights', label: 'AI Insights', icon: 'Brain' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' },
    { id: 'pitch', label: 'Pitch Score', icon: 'Target' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">AI-Powered Insights</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Sparkles" size={16} className="text-primary" />
          <span className="text-sm text-primary font-medium">AI Enhanced</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted/50 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab.icon} size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-64">
        {activeTab === 'insights' && (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                <div className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground mb-2">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                    {insight.impact && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          Impact: {insight.impact}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <Icon name="Lightbulb" size={16} className="text-warning mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-2">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{rec.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          rec.priority === 'high' ?'bg-error/10 text-error' 
                            : rec.priority === 'medium' ?'bg-warning/10 text-warning' :'bg-accent/10 text-accent'
                        }`}>
                          {rec.priority} priority
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Est. {rec.timeToImplement}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" iconName="ArrowRight" iconSize={14}>
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pitch' && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBackground(pitchScore.overall)} mb-4`}>
                <span className={`text-2xl font-bold ${getScoreColor(pitchScore.overall)}`}>
                  {pitchScore.overall}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Overall Pitch Score</h4>
              <p className="text-sm text-muted-foreground">
                {pitchScore.overall >= 80 ? 'Excellent pitch quality' : 
                 pitchScore.overall >= 60 ? 'Good pitch with room for improvement': 'Pitch needs significant improvement'}
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-4">
              <h5 className="font-medium text-foreground">Score Breakdown</h5>
              {pitchScore.breakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.category}</span>
                    <span className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
                      {item.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        item.score >= 80 ? 'bg-success' :
                        item.score >= 60 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{item.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;