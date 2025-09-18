import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a googleadmanager
 */
const config: IIntegrationConfig = {
  description:
    'Manage ad inventory, orders, reports, and more in Google Ad Manager',
  overviewText: `Connect to your Google Ad Manager account to manage your ad inventory, orders, reports, and more in Google Ad Manager. Increase your team’s productivity by keeping your Google Ad Manager account up to date - without manual data entry.
             
Our Google Ad Manager integration enables you to:
              
• Manage and sync ad inventory in your Google Ad Manager account. 
• Create and sync orders in your Google Ad Manager account.
• Fetch reports in your Google Ad Manager account.`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
