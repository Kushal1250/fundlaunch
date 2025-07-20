import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

import FilterChips from './components/FilterChips';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import CampaignGrid from './components/CampaignGrid';
import SearchSuggestions from './components/SearchSuggestions';

const CampaignBrowseDiscovery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Filter State
  const [filters, setFilters] = useState({
    category: [],
    fundingStage: [],
    location: [],
    riskLevel: [],
    fundingRange: { min: 0, max: 10000000 },
    duration: '',
    successProbability: ''
  });

  // Data State
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock campaign data
  const mockCampaigns = [
    {
      id: 1,
      title: "Revolutionary AI-Powered Healthcare Platform",
      company: "MedTech Innovations",
      description: "Transforming patient care through advanced AI diagnostics and personalized treatment recommendations for better health outcomes.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      category: "Healthcare",
      currentFunding: 750000,
      targetFunding: 2000000,
      backers: 234,
      deadline: "2025-09-15",
      location: "United States",
      riskLevel: "Medium",
      aiScore: 87,
      fundingStage: "series_a",
      isBookmarked: false
    },
    {
      id: 2,
      title: "Sustainable Energy Storage Solutions",
      company: "GreenPower Systems",
      description: "Next-generation battery technology for renewable energy storage with 50% longer lifespan and faster charging capabilities.",
      image: "https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?w=400&h=300&fit=crop",
      category: "Environment",
      currentFunding: 1200000,
      targetFunding: 3500000,
      backers: 456,
      deadline: "2025-08-30",
      location: "Germany",
      riskLevel: "Low",
      aiScore: 92,
      fundingStage: "seed",
      isBookmarked: true
    },
    {
      id: 3,
      title: "Blockchain-Based Financial Services",
      company: "CryptoFinance Pro",
      description: "Decentralized financial platform offering secure lending, borrowing, and investment services with transparent blockchain technology.",
      image: "https://images.pixabay.com/photo/2017/12/12/12/44/bitcoin-3014614_1280.jpg?w=400&h=300&fit=crop",
      category: "Finance",
      currentFunding: 890000,
      targetFunding: 1500000,
      backers: 178,
      deadline: "2025-10-20",
      location: "Singapore",
      riskLevel: "High",
      aiScore: 78,
      fundingStage: "pre_seed",
      isBookmarked: false
    },
    {
      id: 4,
      title: "EdTech Learning Management System",
      company: "EduTech Solutions",
      description: "Comprehensive online learning platform with AI-powered personalized curriculum and real-time progress tracking for students.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      category: "Education",
      currentFunding: 450000,
      targetFunding: 1200000,
      backers: 312,
      deadline: "2025-11-10",
      location: "Canada",
      riskLevel: "Low",
      aiScore: 85,
      fundingStage: "seed",
      isBookmarked: false
    },
    {
      id: 5,
      title: "Smart IoT Home Automation",
      company: "SmartHome Tech",
      description: "Complete home automation solution with voice control, energy optimization, and advanced security features for modern living.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=400&h=300&fit=crop",
      category: "Technology",
      currentFunding: 320000,
      targetFunding: 800000,
      backers: 189,
      deadline: "2025-12-05",
      location: "United Kingdom",
      riskLevel: "Medium",
      aiScore: 81,
      fundingStage: "pre_seed",
      isBookmarked: true
    },
    {
      id: 6,
      title: "Organic Food Delivery Network",
      company: "FreshFarm Direct",
      description: "Farm-to-table delivery service connecting local organic farmers with consumers for fresh, sustainable food distribution.",
      image: "https://images.pixabay.com/photo/2017/05/11/19/44/fresh-2305192_1280.jpg?w=400&h=300&fit=crop",
      category: "Food & Beverage",
      currentFunding: 180000,
      targetFunding: 500000,
      backers: 267,
      deadline: "2025-08-15",
      location: "Australia",
      riskLevel: "Low",
      aiScore: 89,
      fundingStage: "seed",
      isBookmarked: false
    }
  ];

  // Mock search suggestions
  const mockSuggestions = [
    { type: 'campaign', title: 'AI Healthcare Platform', subtitle: 'MedTech Innovations', funding: 750000 },
    { type: 'campaign', title: 'Sustainable Energy Storage', subtitle: 'GreenPower Systems', funding: 1200000 },
    { type: 'search', title: 'Healthcare AI', subtitle: 'Popular search' },
    { type: 'search', title: 'Blockchain Finance', subtitle: 'Trending' },
    { type: 'search', title: 'EdTech Solutions', subtitle: 'Recent searches' }
  ];

  // Initialize search from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  // Load initial campaigns
  useEffect(() => {
    loadCampaigns(true);
  }, [filters, sortBy, searchQuery]);

  const loadCampaigns = useCallback(async (reset = false) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filteredCampaigns = [...mockCampaigns];
    
    // Apply search filter
    if (searchQuery) {
      filteredCampaigns = filteredCampaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filters.category.length > 0) {
      filteredCampaigns = filteredCampaigns.filter(campaign =>
        filters.category.includes(campaign.category)
      );
    }
    
    // Apply funding stage filter
    if (filters.fundingStage.length > 0) {
      filteredCampaigns = filteredCampaigns.filter(campaign =>
        filters.fundingStage.includes(campaign.fundingStage)
      );
    }
    
    // Apply location filter
    if (filters.location.length > 0) {
      filteredCampaigns = filteredCampaigns.filter(campaign =>
        filters.location.includes(campaign.location)
      );
    }
    
    // Apply risk level filter
    if (filters.riskLevel.length > 0) {
      filteredCampaigns = filteredCampaigns.filter(campaign =>
        filters.riskLevel.includes(campaign.riskLevel)
      );
    }
    
    // Apply funding range filter
    if (filters.fundingRange) {
      filteredCampaigns = filteredCampaigns.filter(campaign =>
        campaign.targetFunding >= filters.fundingRange.min &&
        campaign.targetFunding <= filters.fundingRange.max
      );
    }
    
    // Apply duration filter
    if (filters.duration) {
      const maxDays = parseInt(filters.duration);
      filteredCampaigns = filteredCampaigns.filter(campaign => {
        const daysRemaining = Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24));
        return daysRemaining <= maxDays;
      });
    }
    
    // Apply success probability filter
    if (filters.successProbability) {
      const minScore = parseInt(filters.successProbability);
      filteredCampaigns = filteredCampaigns.filter(campaign =>
        campaign.aiScore >= minScore
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'funding_progress':
        filteredCampaigns.sort((a, b) => (b.currentFunding / b.targetFunding) - (a.currentFunding / a.targetFunding));
        break;
      case 'deadline':
        filteredCampaigns.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case 'ai_score':
        filteredCampaigns.sort((a, b) => b.aiScore - a.aiScore);
        break;
      case 'newest':
        filteredCampaigns.sort((a, b) => b.id - a.id);
        break;
      case 'most_funded':
        filteredCampaigns.sort((a, b) => b.currentFunding - a.currentFunding);
        break;
      case 'most_backers':
        filteredCampaigns.sort((a, b) => b.backers - a.backers);
        break;
      default:
        // Keep original order for relevance
        break;
    }
    
    if (reset) {
      setCampaigns(filteredCampaigns);
      setPage(1);
    } else {
      setCampaigns(prev => [...prev, ...filteredCampaigns]);
      setPage(prev => prev + 1);
    }
    
    setHasMore(filteredCampaigns.length >= 6);
    setLoading(false);
  }, [filters, sortBy, searchQuery]);

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 0) {
      const filteredSuggestions = mockSuggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    navigate(`/campaign-browse-discovery?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'campaign') {
      navigate('/campaign-detail-investment', { state: { campaignId: suggestion.id } });
    } else {
      setSearchQuery(suggestion.title);
      setShowSuggestions(false);
      navigate(`/campaign-browse-discovery?search=${encodeURIComponent(suggestion.title)}`);
    }
  };

  // Filter handlers
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      category: [],
      fundingStage: [],
      location: [],
      riskLevel: [],
      fundingRange: { min: 0, max: 10000000 },
      duration: '',
      successProbability: ''
    };
    setFilters(resetFilters);
  };

  const handleRemoveFilter = (key, value) => {
    if (Array.isArray(filters[key])) {
      setFilters(prev => ({
        ...prev,
        [key]: prev[key].filter(item => item !== value)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: key === 'fundingRange' ? { min: 0, max: 10000000 } : ''
      }));
    }
  };

  const handleClearAllFilters = () => {
    handleResetFilters();
  };

  // Campaign interaction handlers
  const handleBookmark = (campaignId, isBookmarked) => {
    setCampaigns(prev => prev.map(campaign =>
      campaign.id === campaignId ? { ...campaign, isBookmarked } : campaign
    ));
  };

  const handleShare = (campaign) => {
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: campaign.description,
        url: `${window.location.origin}/campaign-detail-investment?id=${campaign.id}`
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/campaign-detail-investment?id=${campaign.id}`);
      // You could show a toast notification here
    }
  };

  const handleLoadMore = () => {
    loadCampaigns(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Search and Filter Bar */}
        <div className="sticky top-16 bg-background/95 backdrop-blur-header border-b border-border z-30">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <form onSubmit={handleSearchSubmit}>
                  <Input
                    type="search"
                    placeholder="Search campaigns, companies, or categories..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="pl-10"
                  />
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                </form>
                
                {showSuggestions && (
                  <SearchSuggestions
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                    searchQuery={searchQuery}
                  />
                )}
              </div>

              {/* Sort Dropdown */}
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setIsFilterPanelOpen(true)}
                className="flex items-center space-x-2"
              >
                <Icon name="Filter" size={16} />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        <FilterChips
          activeFilters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleClearAllFilters}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-32">
                <FilterPanel
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </div>

            {/* Campaign Grid */}
            <div className="flex-1 min-w-0">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 'Discover Campaigns'}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {loading && campaigns.length === 0 
                      ? 'Loading campaigns...' 
                      : `${campaigns.length} campaign${campaigns.length !== 1 ? 's' : ''} found`
                    }
                  </p>
                </div>
              </div>

              {/* Campaign Grid */}
              <CampaignGrid
                campaigns={campaigns}
                loading={loading}
                onBookmark={handleBookmark}
                onShare={handleShare}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
              />
            </div>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          filters={filters}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />
      </main>
    </div>
  );
};

export default CampaignBrowseDiscovery;