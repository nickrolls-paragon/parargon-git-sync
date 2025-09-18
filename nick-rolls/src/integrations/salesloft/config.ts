import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a salesloft
 */
const config: IIntegrationConfig = {
  description: 'Connect your Salesloft account',
  overviewText: `Connect to your Salesloft account to manage your calls, accounts, and people in Salesloft. Increase your team's productivity by keeping your Salesloft account up to date - without manual data entry.
                        
Our Salesloft integration enables you to:
                
• Create or update call records in your Salesloft account
• Sync records from your Salesloft account
• Receive webhooks when records are created or updated in your Salesloft account`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
