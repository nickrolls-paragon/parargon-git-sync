import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a facebookAds
 */
const config: IIntegrationConfig = {
  description: 'Manage ad campaigns with Facebook Ads',
  overviewText: `Connect your Facebook Ads account and manage your ads, creatives, and campaigns in Facebook Ads.
  
Our Facebook Ads integration enables you to:
  
• Manage your ads and ad campaigns
• Create and update your ad creatives
• Send conversion events to your Facebook pixel`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
