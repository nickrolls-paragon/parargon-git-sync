import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a dynamicsbusinesscentral
 */
const config: IIntegrationConfig = {
  description: 'Sync accounts payable with Dynamics',
  overviewText: `Connect your Dynamics 365 Business Central account to manage your accounts payable, vendors, and purchase orders in Dynamics. Increase your team’s productivity by keeping your Dynamics account up to date - without manual data entry.
  
Our Dynamics 365 Business Central integration enables you to:
  
• Manage accounts payable in Dynamics
• Create or update purchase invoices in Dynamics automatically
• Sync vendor information between your app and Dynamics`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
