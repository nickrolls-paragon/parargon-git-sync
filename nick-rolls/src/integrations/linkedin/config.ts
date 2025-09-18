import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a linkedin
 */
const config: IIntegrationConfig = {
  description: 'Connect to your users’ LinkedIn accounts',
  overviewText: `Connect to your LinkedIn account to share posts and sync your profile in LinkedIn. Increase your team’s productivity by keeping your LinkedIn account up to date - without manual data entry.

Our LinkedIn integration enables you to:
       
• Share content from your LinkedIn account
• Sync your profile from your LinkedIn account`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
