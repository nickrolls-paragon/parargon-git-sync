import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a confluence
 */
const config: IIntegrationConfig = {
  description: 'Sync documents with Confluence',
  overviewText: `Connect to your Confluence account access, create, and update their documents in Confluence. Increase your team’s productivity by keeping your Confluence account up to date - without manual data entry.
 
Our Confluence integration enables you to:
 
• Create and update documents in your Confluence account
• Sync documents in your Confluence account`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
