import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a apolloio
 */
const config: IIntegrationConfig = {
  description: 'Connect to your users’ Apollo.io accounts',
  overviewText: `Connect to your Apollo.io account to manage your accounts, contacts, and sequences in Apollo.io. Increase your team’s productivity by keeping your Apollo.io account up to date - without manual data entry. 
                     
Our Apollo.io integration enables you to:
                  
• Create or update accounts, contacts, and opportunities in your Apollo.io account
• Sync contacts on your sequences in your Apollo.io account
• Receive webhooks when records are created or updated in your Apollo.io account`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
