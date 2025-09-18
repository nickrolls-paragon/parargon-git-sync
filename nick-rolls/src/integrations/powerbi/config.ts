import { IIntegrationConfig } from '@useparagon/core/integration';

/**
 * configuration for a powerbi
 */
const config: IIntegrationConfig = {
  description: 'Connect to your Power BI account',
  overviewText: `Connect to your Power BI account to manage your datasets, dataflows, and reports in Power BI. Increase your team’s productivity by keeping your Power BI account up to date - without manual data entry.
                       
Our Power BI integration enables you to:
                
• Sync datasets in your Power BI account
• Export and manage reports in your Power BI account
• Sync data pipelines in your Power BI account`,
  showWatermark: true,
  workflowDisplayOrder: [],
};

export default config;
