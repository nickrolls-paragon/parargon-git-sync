import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';
import { default as TestingSearchEndpoint } from './workflows/testingSearchEndpoint';

/**
 * configuration for a pipedrive
 */
const config: IIntegrationConfig = {
  description: 'Sync records with Pipedrive',
  overviewText: `Connect your Pipedrive account to sync records from your Pipedrive CRM. Enable your sales team to close more deals by keeping your Pipedrive CRM records up to date - without manual data entry.
 
Our Pipedrive integration enables you to:
 
• Automatically create or update records like contacts or deals in Pipedrive
• Sync records from Pipedrive
• Receive updates when new records are created in Pipedrive`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow, TestingSearchEndpoint],
  theme: 'dark',
};

export default config;
