import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a temu
 */
const config: IIntegrationConfig = {
  description: 'Connect your Temu account',
  overviewText: `Connect to your Temu account to manage your product catalog in Temu. Increase your team’s productivity by keeping your Temu account up to date - without manual data entry.
 
Our Temu integration enables you to:
       
• Connect your product catalog and categories
• Query the available brand lists and shipping template lists in your Temu account`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
