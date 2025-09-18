import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a intercom
 */
const config: IIntegrationConfig = {
  description: 'Sync users or send messages with Intercom',
  overviewText: `Connect your Intercom workspace to sync users or send messages in Intercom.  
         

Our Intercom integration enables you to:  
     

• Automatically create or update users in Intercom  
• Sync users from Intercom  
• Send messages to users in Intercom`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
  theme: 'dark',
};

export default config;
