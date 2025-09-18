import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a pagerduty
 */
const config: IIntegrationConfig = {
  description: 'Manage incidents and on-call schedules with PagerDuty',
  overviewText: `Connect to your PagerDuty account to manage your incidents and on-call schedules in PagerDuty.  Increase your team’s productivity by keeping your PagerDuty account up to date - without manual data entry. 
                     
Our PagerDuty integration enables you to:
                  
• Add and configure users on your PagerDuty account
• Automatically create incidents within PagerDuty
• Sync incidents across your apps`,
  showWatermark: true,
  workflowDisplayOrder: [],
};

export default config;
