import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a dynamicsfinance
 */
const config: IIntegrationConfig = {
  description: 'Sync payments with Dynamics 365 Finance',
  overviewText: `Connect to your Dynamics 365 Finance account to manage your customer’s invoices, payments, and more in Dynamics 365 Finance. Increase your team’s productivity by keeping your Dynamics 365 Finance account up to date - without manual data entry.
     
Our Dynamics 365 Finance integration enables you to:
       
• Automatically create or update payments or invoices in your users' Dynamics 365 Finance
• Sync customers, payments, or invoices from Dynamics 365 Finance
• Receive updates when payments are made in Dynamics 365 Finance`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
