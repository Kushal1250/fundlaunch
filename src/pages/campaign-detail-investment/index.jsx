import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CampaignHero from './components/CampaignHero';
import InvestmentPanel from './components/InvestmentPanel';
import CampaignContent from './components/CampaignContent';
import SocialProof from './components/SocialProof';
import Breadcrumb from './components/Breadcrumb';
import Icon from '../../components/AppIcon';

const CampaignDetailInvestment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInvestmentSuccess, setShowInvestmentSuccess] = useState(false);

  // Mock campaign data
  const mockCampaign = {
    id: "tech-startup-2024",
    title: "Revolutionary AI-Powered Smart Home System",
    shortDescription: "Transform your home with intelligent automation that learns your preferences and optimizes energy usage.",
    fullDescription: `Our revolutionary AI-powered smart home system represents the next generation of home automation technology. Unlike traditional smart home solutions that require manual programming and constant adjustment, our system uses advanced machine learning algorithms to understand your daily routines, preferences, and lifestyle patterns.

The system automatically adjusts lighting, temperature, security settings, and energy consumption based on your behavior, weather conditions, and time of day. With our proprietary AI engine, your home becomes truly intelligent, anticipating your needs before you even realize them.

We've integrated cutting-edge IoT sensors, voice recognition technology, and predictive analytics to create a seamless experience that not only enhances comfort but also reduces energy costs by up to 40%. Our beta testing with 500 households has shown remarkable results in user satisfaction and energy efficiency.`,
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    category: "Technology",
    location: "San Francisco, CA",
    launchDate: "2024-01-15",
    deadline: "2024-08-15",
    goalAmount: 2500000,
    currentAmount: 1875000,
    investorCount: 342,
    status: "active",
    gallery: [
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", caption: "Smart home dashboard" },
      { url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", caption: "AI control center" },
      { url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop", caption: "Mobile app interface" },
      { url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop", caption: "Installation process" },
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", caption: "Energy monitoring" },
      { url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop", caption: "Voice control demo" }
    ],
    keyFeatures: [
      {
        title: "AI-Powered Learning",
        description: "Advanced machine learning algorithms that adapt to your lifestyle and preferences automatically."
      },
      {
        title: "Energy Optimization",
        description: "Reduce energy costs by up to 40% through intelligent automation and predictive analytics."
      },
      {
        title: "Voice Integration",
        description: "Seamless integration with popular voice assistants and natural language processing."
      },
      {
        title: "Security Monitoring",
        description: "24/7 intelligent security monitoring with real-time alerts and automated responses."
      },
      {
        title: "Mobile Control",
        description: "Complete home control from anywhere with our intuitive mobile application."
      },
      {
        title: "Easy Installation",
        description: "Professional installation service with minimal disruption to your daily routine."
      }
    ],
    team: [
      {
        name: "Sarah Chen",
        role: "CEO & Co-Founder",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        bio: "Former Google AI researcher with 10+ years in machine learning and IoT development. PhD in Computer Science from Stanford."
      },
      {
        name: "Michael Rodriguez",
        role: "CTO & Co-Founder",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        bio: "Ex-Tesla engineer specializing in hardware integration and energy systems. MS in Electrical Engineering from MIT."
      },
      {
        name: "Emily Watson",
        role: "VP of Product",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        bio: "Former Apple product manager with expertise in consumer electronics and user experience design."
      },
      {
        name: "David Kim",
        role: "Head of Engineering",
        avatar: "https://randomuser.me/api/portraits/men/38.jpg",
        bio: "Senior software architect with 12+ years building scalable IoT platforms and cloud infrastructure."
      }
    ],
    milestones: [
      {
        title: "Prototype Development",
        description: "Complete initial prototype and conduct alpha testing with internal team.",
        date: "Q1 2024",
        completed: true,
        current: false,
        progress: 100
      },
      {
        title: "Beta Testing Program",
        description: "Launch beta testing with 500 households and gather user feedback.",
        date: "Q2 2024",
        completed: true,
        current: false,
        progress: 100
      },
      {
        title: "Manufacturing Partnership",
        description: "Establish manufacturing partnerships and finalize supply chain logistics.",
        date: "Q3 2024",
        completed: false,
        current: true,
        progress: 65
      },
      {
        title: "Regulatory Approval",
        description: "Obtain necessary certifications and regulatory approvals for market launch.",
        date: "Q4 2024",
        completed: false,
        current: false,
        progress: 0
      },
      {
        title: "Market Launch",
        description: "Official product launch and begin shipping to early customers.",
        date: "Q1 2025",
        completed: false,
        current: false,
        progress: 0
      }
    ],
    updates: [
      {
        title: "Major Milestone: 75% Funding Achieved!",
        date: "July 18, 2024",
        content: `We're thrilled to announce that we've reached 75% of our funding goal! This incredible milestone brings us significantly closer to bringing our AI-powered smart home system to market.\n\nThanks to the support of 342 amazing investors, we've raised $1,875,000 of our $2,500,000 goal. Your belief in our vision is truly inspiring and motivates our team to work even harder.\n\nWith this funding, we've been able to accelerate our manufacturing partnerships and are now in advanced negotiations with three major suppliers. We expect to finalize these agreements within the next two weeks.\n\nOur beta testing program continues to exceed expectations, with 94% of participants reporting high satisfaction scores and significant energy savings. The average household in our beta program has seen a 38% reduction in energy costs.\n\nWe're also excited to share that we've received preliminary approval from the FCC for our wireless communication protocols, bringing us one step closer to full regulatory compliance.\n\nThank you for your continued support, and we look forward to sharing more exciting updates as we approach our funding goal!`
      },
      {
        title: "Beta Testing Results Exceed Expectations",
        date: "July 10, 2024",
        content: `Our beta testing program has concluded with outstanding results that exceed our initial projections. Over the past three months, 500 households have been testing our AI-powered smart home system, and the feedback has been overwhelmingly positive.\n\nKey findings from our beta testing:\n• 94% user satisfaction rate\n• Average energy cost reduction of 38%\n• 99.7% system uptime\n• 89% of users report improved home security\n• 92% would recommend to friends and family\n\nOne of our beta testers, Jennifer M. from Austin, Texas, shared: "This system has completely transformed how we interact with our home. It's like having a personal assistant that knows exactly what we need before we ask."\n\nThe AI learning algorithms performed exceptionally well, with most systems achieving optimal personalization within just 2-3 weeks of installation. Our energy optimization features consistently delivered savings that exceeded our 35% target.\n\nBased on this feedback, we've made several improvements to the user interface and added new automation features that will be included in the final product launch.\n\nWe're now moving into the final phase of development and are more confident than ever in our ability to deliver a revolutionary product that will change how people interact with their homes.`
      },
      {
        title: "Strategic Partnership with EcoTech Solutions",date: "June 28, 2024",
        content: `We're excited to announce a strategic partnership with EcoTech Solutions, a leading provider of sustainable energy management systems. This partnership will significantly enhance our product capabilities and accelerate our path to market.\n\nEcoTech Solutions brings over 15 years of experience in energy optimization and has successfully deployed their technology in over 50,000 homes across North America. Their expertise in energy management perfectly complements our AI-powered automation platform.\n\nThrough this partnership, we'll be integrating EcoTech's advanced energy monitoring sensors and their proprietary energy optimization algorithms into our smart home system. This integration will allow us to:\n\n• Provide more accurate energy usage predictions\n• Offer detailed energy consumption analytics\n• Enable integration with solar panels and battery storage systems\n• Support time-of-use electricity pricing optimization\n\nJohn Stevens, CEO of EcoTech Solutions, commented: "We're thrilled to partner with such an innovative team. Their AI technology combined with our energy expertise will create unprecedented value for homeowners."\n\nThis partnership also provides us with access to EcoTech's established distribution network, which will help us scale more quickly once we launch. We expect this collaboration to reduce our time-to-market by approximately 3-4 months.\n\nWe'll be sharing more details about the enhanced features this partnership enables in our next update. Thank you for your continued support as we build the future of smart homes!`
      }
    ],
    comments: [
      {
        author: "Alex Thompson",
        content: "This looks incredibly promising! I've been following smart home technology for years, and this is the first system that seems to truly understand user behavior. How does the AI handle privacy concerns with all the data collection?",timeAgo: "2 hours ago",
        likes: 12,
        isInvestor: true
      },
      {
        author: "Maria Garcia",content: "As someone who works in the energy sector, I'm impressed by the 40% energy savings claim. Can you provide more details about how this compares to existing smart thermostats and energy management systems?",
        timeAgo: "5 hours ago",
        likes: 8,
        isInvestor: false
      },
      {
        author: "Robert Kim",
        content: "The team's background is impressive, especially Sarah's experience at Google AI. What specific machine learning models are you using for the behavioral prediction algorithms?",
        timeAgo: "1 day ago",
        likes: 15,
        isInvestor: true
      },
      {
        author: "Jennifer Walsh",
        content: "I participated in the beta testing program, and I can confirm this system is amazing! It learned our family's routine within two weeks and has saved us over $200 on our monthly energy bill.",timeAgo: "2 days ago",
        likes: 23,
        isInvestor: true
      }
    ],
    recentInvestors: [
      { name: "Michael Chen", amount: 5000, timeAgo: "2 hours ago" },
      { name: "Sarah Johnson", amount: 2500, timeAgo: "4 hours ago" },
      { name: "David Rodriguez", amount: 10000, timeAgo: "6 hours ago" },
      { name: "Emily Watson", amount: 1500, timeAgo: "8 hours ago" },
      { name: "James Wilson", amount: 7500, timeAgo: "12 hours ago" }
    ],
    recentActivity: [
      { investor: "Michael Chen", amount: 5000, timeAgo: "2 hours ago" },
      { investor: "Sarah Johnson", amount: 2500, timeAgo: "4 hours ago" },
      { investor: "David Rodriguez", amount: 10000, timeAgo: "6 hours ago" },
      { investor: "Emily Watson", amount: 1500, timeAgo: "8 hours ago" },
      { investor: "James Wilson", amount: 7500, timeAgo: "12 hours ago" },
      { investor: "Lisa Anderson", amount: 3000, timeAgo: "1 day ago" },
      { investor: "Robert Kim", amount: 8000, timeAgo: "1 day ago" },
      { investor: "Jennifer Walsh", amount: 2000, timeAgo: "2 days ago" }
    ],
    testimonials: [
      {
        name: "Jennifer Walsh",avatar: "https://randomuser.me/api/portraits/women/44.jpg",rating: 5,comment: "This system has completely transformed our home. The AI learns so quickly and the energy savings are real!",amount: 2000,timeAgo: "2 days ago"
      },
      {
        name: "Robert Kim",avatar: "https://randomuser.me/api/portraits/men/52.jpg",rating: 5,comment: "Impressive technology and excellent team. This is the future of smart homes.",amount: 8000,timeAgo: "1 day ago"
      },
      {
        name: "Lisa Anderson",avatar: "https://randomuser.me/api/portraits/women/38.jpg",rating: 4,comment: "Great product with solid execution. Looking forward to seeing this in the market.",amount: 3000,timeAgo: "1 day ago"
      }
    ],
    endorsements: [
      {
        organization: "TechCrunch",logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",quote: "A revolutionary approach to smart home automation that could reshape the entire industry.",spokesperson: "Sarah Miller",title: "Senior Technology Editor"
      },
      {
        organization: "Smart Home Association",logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",quote: "The most innovative smart home solution we\'ve seen in years. This team is solving real problems.",spokesperson: "Dr. James Patterson",title: "Executive Director"
      }
    ],
    socialStats: {
      shares: "2.3K",mentions: "847",followers: "12.5K"
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCampaign(mockCampaign);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleInvestment = (investmentData) => {
    console.log('Investment submitted:', investmentData);
    setShowInvestmentSuccess(true);
    
    // Update campaign data
    setCampaign(prev => ({
      ...prev,
      currentAmount: prev.currentAmount + investmentData.amount,
      investorCount: prev.investorCount + 1,
      recentInvestors: [
        { name: "You", amount: investmentData.amount, timeAgo: "Just now" },
        ...prev.recentInvestors.slice(0, 4)
      ]
    }));

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowInvestmentSuccess(false);
    }, 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-64 md:h-80 lg:h-96 bg-muted rounded-lg"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-64 bg-muted rounded-lg"></div>
                  <div className="h-96 bg-muted rounded-lg"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-96 bg-muted rounded-lg"></div>
                  <div className="h-64 bg-muted rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-semibold text-foreground mb-2">Campaign Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The campaign you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => navigate('/campaign-browse-discovery')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                Browse Other Campaigns
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Success Message */}
      {showInvestmentSuccess && (
        <div className="fixed top-20 right-4 bg-success text-success-foreground p-4 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={20} className="mt-0.5" />
            <div>
              <h4 className="font-medium mb-1">Investment Successful!</h4>
              <p className="text-sm opacity-90">
                Your investment has been submitted. You'll receive a confirmation email shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb campaign={campaign} />

          {/* Campaign Hero */}
          <CampaignHero campaign={campaign} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <CampaignContent campaign={campaign} />
              <SocialProof campaign={campaign} />
            </div>

            {/* Right Column - Investment Panel */}
            <div className="space-y-6">
              <InvestmentPanel campaign={campaign} onInvest={handleInvestment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailInvestment;