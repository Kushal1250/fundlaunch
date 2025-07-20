import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SocialProof = ({ campaign }) => {
  return (
    <div className="space-y-6">
      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {campaign.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={14} color="white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.investor}</span> invested{' '}
                  <span className="font-medium text-accent">${activity.amount.toLocaleString()}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investor Testimonials */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">What Investors Say</h3>
        <div className="space-y-4">
          {campaign.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-muted rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-foreground">{testimonial.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < testimonial.rating ? 'text-warning fill-current' : 'text-muted'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">"{testimonial.comment}"</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Invested ${testimonial.amount.toLocaleString()} • {testimonial.timeAgo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Endorsements */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Endorsements</h3>
        <div className="space-y-4">
          {campaign.endorsements.map((endorsement, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="w-12 h-12 overflow-hidden rounded-lg">
                <Image
                  src={endorsement.logo}
                  alt={endorsement.organization}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-foreground">{endorsement.organization}</span>
                  <Icon name="BadgeCheck" size={16} className="text-accent" />
                </div>
                <p className="text-sm text-muted-foreground mb-2">"{endorsement.quote}"</p>
                <p className="text-xs text-muted-foreground">
                  — {endorsement.spokesperson}, {endorsement.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Buzz */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Social Media Buzz</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">{campaign.socialStats.shares}</div>
            <div className="text-sm text-muted-foreground">Shares</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">{campaign.socialStats.mentions}</div>
            <div className="text-sm text-muted-foreground">Mentions</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">{campaign.socialStats.followers}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
        </div>
        
        {/* Share Buttons */}
        <div className="flex justify-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Icon name="Facebook" size={16} />
            <span className="text-sm">Share</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200">
            <Icon name="Twitter" size={16} />
            <span className="text-sm">Tweet</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200">
            <Icon name="Linkedin" size={16} />
            <span className="text-sm">Share</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
            <Icon name="Link" size={16} />
            <span className="text-sm">Copy</span>
          </button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Trust & Security</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon name="Shield" size={20} className="text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Verified Campaign</p>
              <p className="text-xs text-muted-foreground">Identity confirmed</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon name="Lock" size={20} className="text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Secure Payments</p>
              <p className="text-xs text-muted-foreground">SSL encrypted</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon name="FileCheck" size={20} className="text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Legal Compliance</p>
              <p className="text-xs text-muted-foreground">SEC registered</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <Icon name="Users" size={20} className="text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Investor Protection</p>
              <p className="text-xs text-muted-foreground">SIPC insured</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;