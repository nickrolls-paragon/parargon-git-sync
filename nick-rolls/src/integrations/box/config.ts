import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as BoxTrigger } from './workflows/boxTrigger';
import { default as NewWorkflow } from './workflows/newWorkflow';
import { default as NewWorkflow_1 } from './workflows/newWorkflow_1';
import { default as NewWorkflow_2 } from './workflows/newWorkflow_2';
import { default as NewWorkflow_3 } from './workflows/newWorkflow_3';
import { default as ReleaseTesting } from './workflows/releaseTesting';

/**
 * configuration for a box
 */
const config: IIntegrationConfig = {
  description: 'Save files to Box',
  overviewText: `Connect to your Box account to access, create, and update files in Box. Increase your team’s productivity by keeping your Box account up to date - without manual data entry.
    
Our Box integration enables you to: 
                
• Save files to your Box
• Sync files from your Box`,
  showWatermark: false,
  workflowDisplayOrder: [
    BoxTrigger,
    NewWorkflow,
    NewWorkflow_1,
    NewWorkflow_2,
    NewWorkflow_3,
    ReleaseTesting,
  ],
};

export default config;
