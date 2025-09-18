import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';
import { default as NewWorkflow_1 } from './workflows/newWorkflow_1';

/**
 * configuration for a mailchimp
 */
const config: IIntegrationConfig = {
  description: 'Manage campaigns and contacts in Mailchimp',
  overviewText: `Connect your Mailchimp account and manage your campaigns and contacts in Mailchimp. Grow your business and reach more customers by automating your marketing with our Mailchimp integration.

Our Mailchimp integration enables you to:

• Create and manage campaigns in Mailchimp
• Sync contacts with Mailchimp`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow, NewWorkflow_1],
  theme: 'dark',
};

export default config;
