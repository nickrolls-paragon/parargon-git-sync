import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as AudyenceTroubleshooting } from './workflows/audyenceTroubleshooting';
import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a marketo
 */
const config: IIntegrationConfig = {
  description: 'Sync leads to Marketo',
  overviewText: `Connect your Marketo account to sync leads to your Lists in Marketo. Grow your business and reach more customers by automating your marketing with our Marketo integration.  
  
Our Marketo integration enables you to:  
    
• Automatically create or update leads in Marketo
• Add leads to lists in Marketo`,
  showWatermark: true,
  workflowDisplayOrder: [AudyenceTroubleshooting, NewWorkflow],
};

export default config;
