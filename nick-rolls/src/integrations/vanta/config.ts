import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';
import { default as NewWorkflow_1 } from './workflows/newWorkflow_1';

/**
 * configuration for a vanta
 */
const config: IIntegrationConfig = {
  description: 'Sync documents in Vanta',
  overviewText: `Connect to your Vanta account to manage your documents and policies in Vanta.Increase your team’s productivity by keeping your Vanta account up to date - without manual data entry.
    
Our Vanta integration enables you to:
   
• Download or upload documents in your Vanta account
• Manage policies in your Vanta account
• Query test results in your Vanta account`,
  showWatermark: false,
  workflowDisplayOrder: [NewWorkflow, NewWorkflow_1],
};

export default config;
