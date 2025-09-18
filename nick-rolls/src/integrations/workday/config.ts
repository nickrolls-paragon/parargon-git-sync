import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a workday
 */
const config: IIntegrationConfig = {
  description: 'Manage employees in Workday',
  overviewText: `Connect to your Workday account to manage employee records in Workday. Increase your team’s productivity by keeping your Workday employee records up to date - without manual data entry. 
                     
Our Workday integration enables you to:
                  
• Automatically create or update employees in Workday
• Sync employees from Workday`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
