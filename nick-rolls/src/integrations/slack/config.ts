import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as Ai21GetChannels } from './workflows/ai21GetChannels';
import { default as Ai21WorkflowGetMessages } from './workflows/ai21WorkflowGetMessages';
import { default as Ai21WorkflowTesting } from './workflows/ai21WorkflowTesting';
import { default as DemoWorkflow } from './workflows/demoWorkflow';
import { default as GetUserByEmailFanoutDm } from './workflows/getUserByEmailFanoutDm';
import { default as MessageToChannelDemoWorkflow } from './workflows/messageToChannelDemoWorkflow';
import { default as MessageToChannelIntegrationSettings } from './workflows/messageToChannelIntegrationSettings';

/**
 * configuration for a slack
 */
const config: IIntegrationConfig = {
  description: 'Send notifications to Slack',
  overviewText: `Connect your Slack workspace to Monday.com for notifications and alerts in Slack. Stay connected to important activity by bringing it all together in your Slack workspace.


Our Slack integration enables you to:
   

• Receive alerts and notifications in your Slack workspace
• Notify or DM specific team members based on certain activity`,
  showWatermark: false,
  workflowDisplayOrder: [
    DemoWorkflow,
    GetUserByEmailFanoutDm,
    MessageToChannelDemoWorkflow,
    Ai21WorkflowTesting,
    Ai21WorkflowGetMessages,
    Ai21GetChannels,
    MessageToChannelIntegrationSettings,
  ],
  theme: 'match_system_theme',
};

export default config;
