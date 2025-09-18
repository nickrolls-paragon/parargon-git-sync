import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a monday.com
 */
const config: IIntegrationConfig = {
  description: 'Manage items and boards in Monday.com',
  overviewText: `Connect to your Monday.com account to manage items in Monday.com. Increase your team’s productivity by keeping your Monday.com boards up to date - without manual data entry.
 
Our Monday.com integration enables you to:
 
• Automatically create or update items in Monday.com
• Sync items from Monday.com
• Receive updates when items are created or updated in Monday.com`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
