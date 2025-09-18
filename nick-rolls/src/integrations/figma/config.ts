import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a figma
 */
const config: IIntegrationConfig = {
  description: 'Retrieve files from Figma',
  overviewText: `Connect to your Figma account to read and access files in Figma. Increase your team’s productivity by keeping your Figma account up to date - without manual data entry. 
                     
Our Figma integration enables you to:
                  
• Read and retrieve files in your Figma account
• Receive notifications when files change in your Figma account`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
