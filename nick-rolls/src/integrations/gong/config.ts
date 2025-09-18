import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a gong
 */
const config: IIntegrationConfig = {
  description: 'Manage call data in Gong',
  overviewText: `Connect to your Gong account to manage your calls in Gong. Increase your team’s productivity by keeping your Gong account up to date - without manual data entry.

Our Gong integration enables you to:
       
• Add and sync calls in Gong   
• Sync CRM inputs in Gong
• Audit logs from Gong`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
