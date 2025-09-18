import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';
import { default as PrCreated } from './workflows/prCreated';

/**
 * configuration for a github
 */
const config: IIntegrationConfig = {
  description: 'Connect to your users’ GitHub accounts',
  overviewText: `Connect to your GitHub account to manage your issues, releases, repositories, and more in GitHub. Increase your team’s productivity by keeping your GitHub account up to date - without manual data entry.

Our GitHub integration enables you to:
       
• Create and sync issues in your GitHub account   
• Tag issues and automate creating comments in your GitHub account
• Receive updates when entities are created or updated in your GitHub account`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow, PrCreated],
};

export default config;
