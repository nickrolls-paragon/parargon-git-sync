import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';
import { default as NewWorkflow_1 } from './workflows/newWorkflow_1';
import { default as WelcomeMessage } from './workflows/welcomeMessage';

/**
 * configuration for a microsoftTeams
 */
const config: IIntegrationConfig = {
  description: 'Connect to your users’ Teams workspaces',
  overviewText: `Connect your Teams workspace to receive notifications and alerts in Teams. Stay connected to important activity by bringing it all together in your Teams workspace.<br>

Our Teams integration enables you to:<br>

• Receive alerts and notifications in your Teams workspace
• Notify specific team members by sending chat messages based on certain activity`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow, NewWorkflow_1, WelcomeMessage],
};

export default config;
