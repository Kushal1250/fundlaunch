import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import CampaignDashboard from "pages/campaign-dashboard";
import KycVerificationCenter from "pages/kyc-verification-center";
import InvestmentPortfolioAnalytics from "pages/investment-portfolio-analytics";
import CampaignBrowseDiscovery from "pages/campaign-browse-discovery";
import CampaignDetailInvestment from "pages/campaign-detail-investment";
import InvestmentDashboard from "pages/investment-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<CampaignDashboard />} />
        <Route path="/campaign-dashboard" element={<CampaignDashboard />} />
        <Route path="/kyc-verification-center" element={<KycVerificationCenter />} />
        <Route path="/investment-portfolio-analytics" element={<InvestmentPortfolioAnalytics />} />
        <Route path="/campaign-browse-discovery" element={<CampaignBrowseDiscovery />} />
        <Route path="/campaign-detail-investment" element={<CampaignDetailInvestment />} />
        <Route path="/investment-dashboard" element={<InvestmentDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;