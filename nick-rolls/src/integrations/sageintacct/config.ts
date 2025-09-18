import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a sageintacct
 */
const config: IIntegrationConfig = {
  description: 'Sync accounts payable with Sage Intacct',
  overviewText: `Connect your Sage Intacct account to manage your accounts payable, vendors, and purchase orders in Sage Intacct. Increase your team’s productivity by keeping your Sage Intacct account up to date - without manual data entry.
      
Our Sage Intacct integration enables you to:
    
• Manage accounts payable in Sage Intacct
• Create or update bills in Sage Intacct automatically
• Sync vendor information between your app and Intacct`,
  showWatermark: false,
  workflowDisplayOrder: [],
};

export default config;
