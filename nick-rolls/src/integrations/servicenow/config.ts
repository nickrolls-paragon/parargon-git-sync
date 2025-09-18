import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a servicenow
 */
const config: IIntegrationConfig = {
  description: 'Sync records with ServiceNow',
  overviewText: `Connect your ServiceNow account to sync records with ServiceNow. Increase your team’s productivity by keeping your ServiceNow incidents and other records up to date - without manual data entry.
 
Our ServiceNow integration enables you to:
 
• Automatically create or update records in ServiceNow
• Sync records from ServiceNow
• Receive updates when new records are created in ServiceNow`,
  showWatermark: true,
  workflowDisplayOrder: [],
};

export default config;
