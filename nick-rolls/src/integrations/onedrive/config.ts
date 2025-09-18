import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a onedrive
 */
const config: IIntegrationConfig = {
  description: 'Save files to OneDrive',
  overviewText: `Connect to your OneDrive account to access, create, and update their files in OneDrive. Increase your team’s productivity by keeping your OneDrive account up to date - without manual data entry.
  
Our OneDrive integration enables you to:
  
• Save files to your OneDrive
• Sync files from your OneDrive`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
