import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as BatchUpload } from './workflows/batchUpload';
import { default as TestWorkflow } from './workflows/testWorkflow';

/**
 * configuration for a amplitude
 */
const config: IIntegrationConfig = {
  description: 'Connect your Amplitude account',
  overviewText: `Connect to your Amplitude account to manage your events and data in Amplitude. Increase your team’s productivity by keeping your Amplitude account up to date - without manual data entry.
 
Our Amplitude's integration enables you to:
 
• Upload event data to your Amplitude account
• Query your data in your Amplitude dashboards
• Export event data from your Amplitude accounts`,
  showWatermark: true,
  workflowDisplayOrder: [BatchUpload, TestWorkflow],
};

export default config;
