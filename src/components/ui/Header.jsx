import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'investment', message: 'New investment opportunity available', unread: true },
    { id: 2, type: 'campaign', message: 'Your campaign reached 75% funding', unread: true },
    { id: 3, type: 'kyc', message: 'KYC verification completed', unread: false }
  ]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('entrepreneur'); // entrepreneur or investor
  
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => n.unread).length;

  const navigationItems = [
    {
      label: 'Dashboard',
      path: userRole === 'entrepreneur' ? '/campaign-dashboard' : '/investment-dashboard',
      icon: 'LayoutDashboard',
      roleAccess: 'universal'
    },
    {
      label: 'Browse',
      path: '/campaign-browse-discovery',
      icon: 'Search',
      roleAccess: 'universal'
    },
    {
      label: 'Portfolio',
      path: '/investment-portfolio-analytics',
      icon: 'TrendingUp',
      roleAccess: 'investor'
    }
  ];

  const userMenuItems = [
    { label: 'Profile Settings', icon: 'User', action: () => console.log('Profile') },
    { label: 'KYC Verification', icon: 'Shield', path: '/kyc-verification-center' },
    { label: 'Account Settings', icon: 'Settings', action: () => console.log('Settings') },
    { label: 'Help & Support', icon: 'HelpCircle', action: () => console.log('Help') },
    { label: 'Sign Out', icon: 'LogOut', action: () => console.log('Sign out') }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/campaign-browse-discovery?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.type === 'campaign') {
      navigate('/campaign-dashboard');
    } else if (notification.type === 'investment') {
      navigate('/investment-dashboard');
    } else if (notification.type === 'kyc') {
      navigate('/kyc-verification-center');
    }
    setIsNotificationOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-dropdown')) {
        setIsNotificationOpen(false);
      }
      if (!event.target.closest('.user-menu-dropdown')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isActivePath = (path) => {
    if (path === '/campaign-dashboard' || path === '/investment-dashboard') {
      return location.pathname === '/campaign-dashboard' || location.pathname === '/investment-dashboard';
    }
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-header border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">FundLaunch</span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems
            .filter(item => item.roleAccess === 'universal' || item.roleAccess === userRole)
            .map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-muted ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  type="search"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 h-9"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2"
                >
                  <Icon name="X" size={16} />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:flex"
              >
                <Icon name="Search" size={16} />
              </Button>
            )}
          </div>

          {/* Notifications */}
          <div className="relative notification-dropdown">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative"
            >
              <Icon name="Bell" size={16} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg elevation-3 z-999">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                        Mark all read
                      </Button>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full p-4 text-left hover:bg-muted transition-colors duration-200 border-b border-border last:border-b-0 ${
                        notification.unread ? 'bg-accent/5' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-accent' : 'bg-muted'}`} />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative user-menu-dropdown">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium">John Doe</span>
              <Icon name="ChevronDown" size={14} />
            </Button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg elevation-3 z-999">
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-border mb-2">
                    <p className="font-medium text-foreground">John Doe</p>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        userRole === 'entrepreneur' ?'bg-accent/10 text-accent' :'bg-primary/10 text-primary'
                      }`}>
                        {userRole === 'entrepreneur' ? 'Entrepreneur' : 'Investor'}
                      </span>
                    </div>
                  </div>
                  {userMenuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (item.path) {
                          navigate(item.path);
                        } else if (item.action) {
                          item.action();
                        }
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors duration-200"
                    >
                      <Icon name={item.icon} size={16} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={16} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="p-4 space-y-2">
            {navigationItems
              .filter(item => item.roleAccess === 'universal' || item.roleAccess === userRole)
              .map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="pt-2">
              <Input
                type="search"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </form>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;