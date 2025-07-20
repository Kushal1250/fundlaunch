import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumb = ({ campaign }) => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: 'Browse', path: '/campaign-browse-discovery' },
    { label: campaign.category, path: `/campaign-browse-discovery?category=${campaign.category.toLowerCase()}` },
    { label: campaign.title, path: null, current: true }
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {item.current ? (
            <span className="text-foreground font-medium truncate max-w-xs">
              {item.label}
            </span>
          ) : (
            <button
              onClick={() => navigate(item.path)}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;