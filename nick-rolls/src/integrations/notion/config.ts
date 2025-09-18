import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as PageCreatedThenUpdated } from './workflows/pageCreatedThenUpdated';

/**
 * configuration for a notion
 */
const config: IIntegrationConfig = {
  description: 'Connect your Notion workspace',
  overviewText: `Connect to your Notion account to manage your pages and databases in Notion. Increase your team’s productivity by keeping your Notion account up to date - without manual data entry.
              
Our notion integration enables you to:
           
• Sync data in pages and databases in your Notion workspace
• Create and update page content in your Notion workspace`,
  showWatermark: true,
  workflowDisplayOrder: [PageCreatedThenUpdated],
  theme: 'dark',
};

export default config;
