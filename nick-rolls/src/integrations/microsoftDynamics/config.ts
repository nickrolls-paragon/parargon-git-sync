import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';
import { default as NewWorkflow_1 } from './workflows/newWorkflow_1';

/**
 * configuration for a microsoftDynamics
 */
const config: IIntegrationConfig = {
  description: 'Sync records from Microsoft Dynamics',
  overviewText: `Connect your Dynamics 365 Sales account to manage opportunities and leads in Dynamics. Increase your team’s productivity by keeping your Dynamics account up to date - without manual data entry.

Our Dynamics 365 Sales integration enables you to:

• Create or update opportunities in Dynamics
• Sync leads from your Dynamics account
• Receive webhooks when records are created or updated in Dynamics`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow, NewWorkflow_1],
};

export default config;
