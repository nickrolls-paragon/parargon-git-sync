import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a segment
 */
const config: IIntegrationConfig = {
  description: 'Manage your workspaces in Segment',
  overviewText: `Connect to your Segment account to manage your Segment settings. Increase your team's productivity by keeping your Segment account up to date - without manual data entry.
    
• Configure warehouses and sources in your users' Segment accounts
• Create and maintain data destination filters in your users' Segment accounts
• Manage custom Segment Edge functions in your users' Segment accounts`,
  showWatermark: true,
  workflowDisplayOrder: [],
};

export default config;
