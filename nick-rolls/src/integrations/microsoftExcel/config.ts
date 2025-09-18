import { IIntegrationConfig } from '@useparagon/core/integration';

import { default as NewWorkflow } from './workflows/newWorkflow';

/**
 * configuration for a microsoftExcel
 */
const config: IIntegrationConfig = {
  description: 'Sync data with Microsoft Excel',
  overviewText: `Connect to your Microsoft Excel account to access, create, and update your spreadsheets in Microsoft Excel. Increase your team’s productivity by keeping your Microsoft Excel account up to date - without manual data entry.
    
Our Microsoft Excel integration enables you to:

• Automatically create or update rows in Microsoft Excel
• Sync spreadsheets from Microsoft Excel
• Receive updates when new rows are added to a spreadsheet in Microsoft Excel`,
  showWatermark: true,
  workflowDisplayOrder: [NewWorkflow],
};

export default config;
