import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a azuredevops
 */
const config: IIntegrationConfig = {
  description: 'Manage boards and work items in Azure DevOps',
  overviewText: `Connect your Azure DevOps account and manage your boards and work items. Grow your business faster by keeping your Azure DevOps account up to date - without manual data entry.
  
Our Azure DevOps integration enables you to:
  
• Automatically create or update work items in Azure DevOps
• Receive updates when a work item is created or updated in Azure DevOps`,
  showWatermark: true,
  workflowDisplayOrder: [],
};

export default config;
