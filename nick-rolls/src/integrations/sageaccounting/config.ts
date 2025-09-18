import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a sageaccounting
 */
const config: IIntegrationConfig = {
  description: 'Sync accounts with Sage Accounting',
  overviewText: `Connect to your Sage Accounting account to manage your invoicing, cashflow, payments, tax, and more in Sage Accounting. Increase your team’s productivity by keeping your Sage Accounting account up to date - without manual data entry.
     
Our Sage Accounting integration enables you to:
       
• Add, create, or update payments or invoices in your Sage Accounting account   
• Sync customers, payments, or invoices from your Sage Accounting account
• Receive updates when payments are made in your Sage Accounting account`,
  showWatermark: true,
  workflowDisplayOrder: [],
};

export default config;
