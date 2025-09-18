import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a stripe
 */
const config: IIntegrationConfig = {
  description: 'Sync customers or payments from Stripe',
  overviewText: `Connect your Stripe account and sync your Stripe customers, payments, or products. Grow your business faster by keeping your Stripe account up to date - without manual data entry.
   

Our Stripe integration enables you to:
   

• Automatically create or update customers in Stripe
• Sync payments or transactions from Stripe
• Receive updates when payments are made in Stripe`,
  showWatermark: true,
  workflowDisplayOrder: [],
};

export default config;
