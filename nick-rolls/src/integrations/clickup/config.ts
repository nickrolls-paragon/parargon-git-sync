import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';
import { default as TaskFanout } from './workflows/taskFanout';

/**
 * configuration for a clickup
 */
const config: IIntegrationConfig = {
  description: 'Manage lists and tasks in ClickUp',
  overviewText: `Connect to your ClickUp account to manage your tasks in ClickUp. Increase your team’s productivity by keeping your ClickUp spaces up to date - without manual data entry.

Our ClickUp integration enables you to:
    
• Automatically create or update tasks in ClickUp    
• Sync tasks from ClickUp   
• Receive updates when tasks are created or updated in ClickUp`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow, TaskFanout],
};

export default config;
