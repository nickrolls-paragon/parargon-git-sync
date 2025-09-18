import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a close
 */
const config: IIntegrationConfig = {
  description: 'Sync records from Close',
  overviewText: `Connect to your Close account to manage your opportunities, contacts, and leads in Close. Increase your team’s productivity by keeping your Close account up to date - without manual data entry.
   
Our Close integration enables you to:
   
• Create or update records in your Close account
• Sync records from your Close account
• Receive webhooks when records are created or updated in your Close account`,
  showWatermark: true,
  workflowDisplayOrder: [],
};

export default config;
