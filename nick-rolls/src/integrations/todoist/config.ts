import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a todoist
 */
const config: IIntegrationConfig = {
  description: 'Connect to your users’ Todoist accounts',
  overviewText: `Connect to your Todoist account to manage your projects and tasks in Todoist. Increase your team’s productivity by keeping your Todoist account up to date - without manual data entry. 
                     
Our Todoist integration enables you to:
                  
• Automatically create or update items in Todoist
• Sync tasks and issues from Todoist
• Receive updates when items are created or updated in Todoist`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
