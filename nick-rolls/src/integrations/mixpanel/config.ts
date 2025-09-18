import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as BatchWorkflow } from './workflows/batchWorkflow';

/**
 * configuration for a mixpanel
 */
const config: IIntegrationConfig = {
  description: 'Sync applications and candidates from Mixpanel',
  overviewText: `Connect to your Mixpanel account to manage your events, reports, and data in Mixpanel. Increase your teams productivity by keeping your mixpanel account up to date - without manual data entry.
                       
Our Mixpanel integration enables you to:
                
• Send event or profile data to your Mixpanel account 
• Query event data in your Mixpanel account
• Perform custom JQL Queries in your Mixpanel account`,
  showWatermark: true,
  workflowDisplayOrder: [BatchWorkflow],
};

export default config;
