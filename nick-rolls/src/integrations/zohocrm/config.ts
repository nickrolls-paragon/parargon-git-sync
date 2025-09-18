import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a zohocrm
 */
const config: IIntegrationConfig = {
  description: 'Connect to your users’ Zoho CRM accounts',
  overviewText: `Connect to your Zoho CRM account to manage your accounts, contacts, leads, and opportunities in Zoho CRM. Increase your team’s productivity by keeping your Zoho CRM account up to date - without manual data entry.
                       
Our Zoho CRM integration enables you to:
                
• Create or update records in your users’ Zoho CRM accounts
• Sync records from your users’ Zoho CRM accounts
• Receive webhooks when records are created or updated in your users’ Zoho CRM accounts`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
