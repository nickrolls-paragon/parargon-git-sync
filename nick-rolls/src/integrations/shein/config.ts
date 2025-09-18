import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a shein
 */
const config: IIntegrationConfig = {
  description: "Connect to your users' SHEIN stores",
  overviewText: `Connect to your SHEIN account to manage your purchase orders, inventory, and sales in SHEIN. Increase your team’s productivity by keeping your SHEIN account up to date - without manual data entry.
 
Our SHEIN integration enables you to:
       
• Create purchase orders in your SHEIN store.
• Sync orders and inventory from your SHEIN account.
• Receive webhooks when orders are created in your SHEIN account.`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
