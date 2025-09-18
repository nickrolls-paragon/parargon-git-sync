import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';
import { default as NewWorkflow_1 } from './workflows/newWorkflow_1';

/**
 * configuration for a outlook
 */
const config: IIntegrationConfig = {
  description: 'Manage mail and calendar in Outlook',
  overviewText: `Connect to your Outlook account to manage your mail and calendar in SharePoint. Increase your team’s productivity by keeping your Outlook calendar updated - without manual data entry.
  
Our Outlook integration enables you to:
  
• Automatically create or update calendar events in Outlook
• Sync email or calendar events from Outlook
• Send mail in Outlook`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow, NewWorkflow_1],
};

export default config;
